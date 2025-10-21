// ===============================
//  RegisterScreen.js
// Pantalla de registro principal
// Diseño: campos flotando sobre fondo degradado
// Validaciones completas + feedback visual(falta éxito cuando se conecte con el backend) + responsive
// Incluye indicador de fuerza de contraseña, loader durante envío, mostrar/ocultar contraseña y Captcha anti-bot (para implantar cuando se conecte con el Backend)
// ===============================

import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  useWindowDimensions,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Fondo degradado (como el Splash)
import colors from '../constants/colors'; // Paleta centralizada
import CustomInput from '../components/CustomInput';
import PasswordInput from '../components/PasswordInput';
import PrimaryButton from '../components/PrimaryButton';
import { isValidEmail, isValidPassword, isValidDate } from '../utils/validation'; // Reglas de validación

/* Implantar cuando se conecte con el Backend
// Importamos el componente reCAPTCHA de Expo
import { GoogleReCaptcha } from 'expo-google-recaptcha';
*/

// URL base del backend (leída del .env, con fallback a localhost)
const API_BASE = (process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000').replace(/\/+$/, '');

const RegisterScreen = () => {
  // Hook que da el ancho actual de la pantalla (para comportamiento responsive)
  const { width } = useWindowDimensions();

  // Define el ancho máximo del formulario (420px en desktop, 88% en móvil)
  const maxWidth = Math.min(420, width * 0.88);

  // Estado que almacena los valores del formulario
  const [form, setForm] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    fullName: '',
    birthDate: '',
    terms: false, // checkbox de Términos y Condiciones
  });

  // Estado para almacenar los errores de validación
  const [errors, setErrors] = useState({});

  // Estado para mostrar animación de carga al enviar datos
  const [sending, setSending] = useState(false);

  // Estado para fuerza de contraseña
  const [passwordStrength, setPasswordStrength] = useState({ label: '', color: '' });

  /* Implantar cuando se conecte con el Backend
  // Referencia y token del Captcha
  const recaptchaRef = useRef();
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  */

  // Función auxiliar para actualizar cualquier campo del formulario
  const setField = (key, val) => {
    setForm((s) => ({ ...s, [key]: val }));

    // Si el campo cambiado es contraseña, calculamos su fuerza
    if (key === 'password') evaluatePasswordStrength(val);
  };

  // ===============================
  // FUNCIÓN EVALUAR FUERZA DE CONTRASEÑA
  // ===============================
  const evaluatePasswordStrength = (password) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[!@#$%^&*()_+.,;:?\-=]/.test(password)) score++;

    if (score <= 1)
      setPasswordStrength({ label: 'Débil', color: '#E53935' });
    else if (score === 2)
      setPasswordStrength({ label: 'Media', color: '#FFA726' });
    else if (score >= 3)
      setPasswordStrength({ label: 'Fuerte', color: '#43A047' });
    else setPasswordStrength({ label: '', color: '' });
  };

  // ===============================
  //  VALIDACIÓN DE CAMPOS
  // ===============================
  const validate = () => {
    const e = {}; // objeto temporal de errores

    // Validar usuario
    if (!form.username.trim()) e.username = 'El nombre de usuario es obligatorio.';

    // Validar email
    if (!form.email.trim()) e.email = 'El correo electrónico es obligatorio.';
    else if (!isValidEmail(form.email)) e.email = 'Correo electrónico inválido.';

    // Validar contraseña
    if (!form.password) e.password = 'La contraseña es obligatoria.';
    else if (!isValidPassword(form.password))
      e.password = 'Mín. 8 caracteres, una mayúscula, un número y un símbolo.';

    // Confirmar contraseña
    if (form.password !== form.confirmPassword)
      e.confirmPassword = 'Las contraseñas no coinciden.';

    // Validar fecha opcional
    if (form.birthDate && !isValidDate(form.birthDate))
      e.birthDate = 'Formato de fecha inválido (AAAA/MM/DD).';

    // Términos y condiciones (obligatorio)
    if (!form.terms)
      e.terms = 'Debes aceptar Términos y Condiciones y la Política de Privacidad.';

    /* Implantar cuando se conecte con el Backend
    // Verificación de Captcha (anti-bot)
    if (!recaptchaToken)
      e.captcha = 'Por favor, verifica que no eres un robot.';
    */

    // Actualiza estado de errores y devuelve si el formulario es válido
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // ===============================
  //  ENVÍO DE DATOS
  // ===============================
  const onSubmit = async () => {
    // Primero, validar el formulario
    if (!validate()) return;

    setSending(true); // muestra loader

    try {
      // Cuerpo de la petición: no enviamos confirmPassword ni terms
      const payload = {
        username: form.username.trim(),
        name: form.fullName?.trim() || null,
        email: form.email.trim().toLowerCase(),
        password: form.password,
        birthDate: form.birthDate?.trim() || null,
        /* Implantar cuando se conecte con el Backend
        recaptchaToken, 
        */
      };

      // Petición POST al backend
      const res = await fetch(`${API_BASE}/v1/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      // Manejo de respuestas según código HTTP
      if (res.status === 201) {
        Alert.alert('✅ Registro exitoso', 'Tu cuenta ha sido creada correctamente.');
        setForm({
          username: '',
          password: '',
          confirmPassword: '',
          email: '',
          fullName: '',
          birthDate: '',
          terms: false,
        });
        setErrors({});
        setPasswordStrength({ label: '', color: '' });
        setRecaptchaToken(null);
      } else if (res.status === 409) {
        setErrors({ email: 'El correo electrónico ya está registrado.' });
      } else if (res.status === 400) {
        const data = await safeJson(res);
        const msg = data?.error || 'Campos inválidos o incompletos.';
        Alert.alert('Error', msg);
      } else {
        const data = await safeJson(res);
        const msg = data?.error || 'Ha ocurrido un error inesperado.';
        Alert.alert('Error', msg);
      }
    } catch (err) {
      Alert.alert('Error de conexión', 'No se pudo contactar con el servidor.');
    } finally {
      setSending(false);
    }
  };

  // ===============================
  //  RENDER DEL COMPONENTE
  // ===============================
  return (
    // Fondo con degradado suave 
    <LinearGradient colors={colors.gradient} style={styles.container}>
      {/* Evita que el teclado oculte los campos en iOS */}
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Título de la pantalla */}
          <Text style={styles.title}>Crear cuenta</Text>

          {/* Contenedor del formulario */}
          <View style={[styles.form, { width: maxWidth }]}>
            {/* Campo: Usuario */}
            <CustomInput
              placeholder="Usuario"
              value={form.username}
              onChangeText={(v) => setField('username', v)}
              error={errors.username}
            />

            {/* Campo: Contraseña */}
            <PasswordInput
              placeholder="Contraseña"
              value={form.password}
              onChangeText={(v) => setField('password', v)}
              error={errors.password}
              secureDefault={true} // ojo cerrado por defecto
            />

            {/* Indicador de fuerza de contraseña */}
            {!!form.password && (
              <Text style={[styles.strengthLabel, { color: passwordStrength.color }]}>
                Fortaleza: {passwordStrength.label}
              </Text>
            )}

            {/* Campo: Confirmar contraseña */}
            <PasswordInput
              placeholder="Confirmar contraseña"
              value={form.confirmPassword}
              onChangeText={(v) => setField('confirmPassword', v)}
              error={errors.confirmPassword}
              secureDefault={true}
            />

            {/* Campo: Email */}
            <CustomInput
              placeholder="Correo electrónico"
              value={form.email}
              onChangeText={(v) => setField('email', v)}
              error={errors.email}
              keyboardType="email-address"
            />

            {/* Campo: Nombre completo (opcional) */}
            <CustomInput
              placeholder="Nombre completo (opcional)"
              value={form.fullName}
              onChangeText={(v) => setField('fullName', v)}
            />

            {/* Campo: Fecha de nacimiento (opcional AAAA/MM/DD) */}
            <CustomInput
              placeholder="Fecha de nacimiento (AAAA/MM/DD)"
              value={form.birthDate}
              onChangeText={(v) => setField('birthDate', v)}
              error={errors.birthDate}
            />

            {/* Checkbox: Términos y Condiciones */}
            <TouchableOpacity
              onPress={() => setField('terms', !form.terms)}
              style={styles.termsRow}
              activeOpacity={0.8}
            >
              <View style={[styles.checkbox, form.terms && styles.checkboxChecked]} />
              <Text style={styles.termsText}>
                Acepto los <Text style={styles.link}>Términos y Condiciones</Text> y la{' '}
                <Text style={styles.link}>Política de Privacidad</Text>
              </Text>
            </TouchableOpacity>
            {!!errors.terms && <Text style={styles.error}>{errors.terms}</Text>}

            {/* Implantar cuando se conecte con el Backend
            Captcha anti-bot
            <View style={{ marginTop: 10, marginBottom: 10, alignItems: 'center' }}>
              <GoogleReCaptcha
                ref={recaptchaRef}
                siteKey={process.env.EXPO_PUBLIC_RECAPTCHA_KEY || 'fake-site-key'}
                baseUrl="http://localhost"
                onVerify={setRecaptchaToken}
              />
              {!!errors.captcha && <Text style={styles.error}>{errors.captcha}</Text>}
            </View>
            */}

            {/* Botón o loader */}
            {sending ? (
              <View style={{ marginTop: 10 }}>
                <ActivityIndicator color="#fff" size="small" />
              </View>
            ) : (
              <PrimaryButton text="Registrarse" onPress={onSubmit} />
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

// ===============================
//  Función auxiliar: parsea JSON seguro
// ===============================
async function safeJson(res) {
  try {
    return await res.json();
  } catch {
    return null;
  }
}

// ===============================
//  ESTILOS 
// ===============================
const styles = StyleSheet.create({
  // Contenedor principal del degradado
  container: { flex: 1 },

  // Scroll general (permite desplazarse si hay teclado)
  scroll: {
    flexGrow: 1, 
    alignItems: 'center', 
    justifyContent: 'center', 
    paddingVertical: 60,
    paddingHorizontal: 24, 
  },

  // Título principal del formulario
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.textDark,
    marginBottom: 28, 
    letterSpacing: 0.3, 
  },

  // Contenedor de todos los campos (centrado)
  form: {
    alignItems: 'center',
  },

  // Fila del checkbox de Términos
  termsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    marginBottom: 2,
    alignSelf: 'flex-start', 
  },

  // Cuadro vacío del checkbox
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: colors.primary,
    backgroundColor: 'transparent',
    marginRight: 10,
  },

  // Estado del checkbox marcado
  checkboxChecked: {
    backgroundColor: colors.primary,
  },

  // Texto de Términos y Política
  termsText: {
    color: colors.textDark,
    flexShrink: 1, 
    fontSize: 14,
    lineHeight: 18,
  },

  // Estilo para los links dentro del texto de Términos
  link: {
    color: colors.primary,
    fontWeight: '600',
  },

  // Mensajes de error generales
  error: {
    color: colors.error,
    fontSize: 13,
    alignSelf: 'flex-start',
    marginTop: 6,
    marginBottom: 6,
  },

  // Estilo para indicador de fuerza
  strengthLabel: {
    alignSelf: 'flex-start', 
    fontWeight: '600',
    fontSize: 13,
    marginTop: -10, 
    marginBottom: 10,
    marginLeft: 10,
  },
});

export default RegisterScreen;
