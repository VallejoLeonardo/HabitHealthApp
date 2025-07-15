/**
 * Settings Screen - App configuration and preferences
 */

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import theme from "../../theme";

const SettingsScreen = () => {
  const [notifications, setNotifications] = useState({
    exerciseReminders: true,
    sleepReminders: true,
    nutritionReminders: false,
    weeklyReports: true,
  });

  const [preferences, setPreferences] = useState({
    darkMode: false,
    units: "metric", // metric or imperial
    language: "es",
  });

  const toggleNotification = (key) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const togglePreference = (key) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const settingsSections = [
    {
      title: "Notificaciones",
      items: [
        {
          title: "Recordatorios de Ejercicio",
          subtitle: "Recibe notificaciones para hacer ejercicio",
          type: "switch",
          value: notifications.exerciseReminders,
          onToggle: () => toggleNotification("exerciseReminders"),
        },
        {
          title: "Recordatorios de Sueño",
          subtitle: "Notificaciones para ir a dormir",
          type: "switch",
          value: notifications.sleepReminders,
          onToggle: () => toggleNotification("sleepReminders"),
        },
        {
          title: "Recordatorios de Nutrición",
          subtitle: "Avisos para registrar comidas",
          type: "switch",
          value: notifications.nutritionReminders,
          onToggle: () => toggleNotification("nutritionReminders"),
        },
        {
          title: "Reportes Semanales",
          subtitle: "Resumen semanal de progreso",
          type: "switch",
          value: notifications.weeklyReports,
          onToggle: () => toggleNotification("weeklyReports"),
        },
      ],
    },
    {
      title: "Preferencias",
      items: [
        {
          title: "Modo Oscuro",
          subtitle: "Cambiar apariencia de la app",
          type: "switch",
          value: preferences.darkMode,
          onToggle: () => togglePreference("darkMode"),
        },
        {
          title: "Unidades",
          subtitle: "Sistema métrico",
          type: "navigation",
          value: preferences.units === "metric" ? "Métrico" : "Imperial",
          onPress: () => console.log("Open units selector"),
        },
          {
            title: "Idioma",
            subtitle: "Cambiar idioma de la aplicación",
            type: "navigation",
            value: "Español",
            onPress: () => console.log("Open language selector"),
          },
      ],
    },
    {
      title: "Datos",
      items: [
        /*{
          title: "Exportar Datos",
          subtitle: "Descargar tu información",
          type: "navigation",
          icon: "download-outline",
          onPress: () => console.log("Export data"),
        },*/
        /*{
          title: "Sincronización",
          subtitle: "Configurar respaldo automático",
          type: "navigation",
          icon: "cloud-outline",
          onPress: () => console.log("Sync settings"),
        },*/
        {
          title: "Borrar Datos",
          subtitle: "Eliminar toda la información",
          type: "navigation",
          icon: "trash-outline",
          textColor: theme.colors.error,
          onPress: () => console.log("Delete data"),
        },
      ],
    },
    {
      title: "Soporte",
      items: [
        {
          title: "Centro de Ayuda",
          subtitle: "Preguntas frecuentes y guías",
          type: "navigation",
          icon: "help-circle-outline",
          onPress: () => console.log("Help center"),
        },
        {
          title: "Contactar Soporte",
          subtitle: "Enviar mensaje al equipo",
          type: "navigation",
          icon: "mail-outline",
          onPress: () => console.log("Contact support"),
        },
        {
          title: "Términos y Condiciones",
          subtitle: "Política de privacidad",
          type: "navigation",
          icon: "document-text-outline",
          onPress: () => console.log("Terms"),
        },
      ],
    },
  ];

  const renderSettingItem = (item, index) => {
    return (
      <TouchableOpacity
        key={index}
        style={styles.settingItem}
        onPress={item.onPress}
        disabled={item.type === "switch"}
      >
        <View style={styles.settingLeft}>
          {item.icon && (
            <Ionicons
              name={item.icon}
              size={24}
              color={item.textColor || theme.colors.textSecondary}
              style={styles.settingIcon}
            />
          )}
          <View style={styles.settingText}>
            <Text
              style={[
                styles.settingTitle,
                item.textColor && { color: item.textColor },
              ]}
            >
              {item.title}
            </Text>
            <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
          </View>
        </View>

        <View style={styles.settingRight}>
          {item.type === "switch" ? (
            <Switch
              value={item.value}
              onValueChange={item.onToggle}
              trackColor={{
                false: theme.colors.border,
                true: theme.colors.primaryLight,
              }}
              thumbColor={
                item.value ? theme.colors.primary : theme.colors.textDisabled
              }
            />
          ) : (
            <View style={styles.navigationItem}>
              {item.value && (
                <Text style={styles.settingValue}>{item.value}</Text>
              )}
              <Ionicons
                name="chevron-forward"
                size={20}
                color={theme.colors.textSecondary}
              />
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {settingsSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionCard}>
              {section.items.map((item, itemIndex) => (
                <View key={itemIndex}>
                  {renderSettingItem(item, itemIndex)}
                  {itemIndex < section.items.length - 1 && (
                    <View style={styles.itemDivider} />
                  )}
                </View>
              ))}
            </View>
          </View>
        ))}

        {/* App Version */}
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Versión 1.0.0</Text>
          <Text style={styles.versionSubtext}>HabitHealthApp</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
  },
  sectionTitle: {
    ...theme.textStyles.h4,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
  },
  sectionCard: {
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: theme.borderRadius.md,
    overflow: "hidden",
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  settingIcon: {
    marginRight: theme.spacing.md,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    ...theme.textStyles.body,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  settingSubtitle: {
    ...theme.textStyles.bodySmall,
    color: theme.colors.textSecondary,
  },
  settingRight: {
    alignItems: "center",
  },
  navigationItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingValue: {
    ...theme.textStyles.body,
    color: theme.colors.textSecondary,
    marginRight: theme.spacing.sm,
  },
  itemDivider: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginLeft: theme.spacing.md,
  },
  versionContainer: {
    alignItems: "center",
    paddingVertical: theme.spacing.xl,
  },
  versionText: {
    ...theme.textStyles.body,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  versionSubtext: {
    ...theme.textStyles.bodySmall,
    color: theme.colors.textDisabled,
  },
});

export default SettingsScreen;
