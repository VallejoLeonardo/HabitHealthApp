/**
 * CustomInput Component - Reusable input field with label and validation
 *
 * @param {string} label - Input label
 * @param {string} value - Input value
 * @param {function} onChangeText - Text change handler
 * @param {string} placeholder - Placeholder text
 * @param {string} keyboardType - Keyboard type
 * @param {boolean} secureTextEntry - Secure text entry for passwords
 * @param {string} error - Error message
 * @param {object} style - Additional styles
 */

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import theme from "../../theme";

const CustomInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = "default",
  secureTextEntry = false,
  error,
  style,
  inputStyle,
  multiline = false,
  numberOfLines = 1,
  maxLength,
  editable = true,
  icon,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const getInputStyle = () => {
    const baseStyle = [styles.input];

    if (isFocused) {
      baseStyle.push(styles.inputFocused);
    }

    if (error) {
      baseStyle.push(styles.inputError);
    }

    if (!editable) {
      baseStyle.push(styles.inputDisabled);
    }

    if (multiline) {
      baseStyle.push(styles.inputMultiline);
    }

    return baseStyle;
  };

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View style={styles.inputContainer}>
        {icon && (
          <Ionicons
            name={icon}
            size={20}
            color={
              isFocused ? theme.colors.primary : theme.colors.textSecondary
            }
            style={styles.inputIcon}
          />
        )}

        <TextInput
          style={[...getInputStyle(), inputStyle]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.textDisabled}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          multiline={multiline}
          numberOfLines={numberOfLines}
          maxLength={maxLength}
          editable={editable}
          textAlignVertical={multiline ? "top" : "center"}
        />

        {secureTextEntry && (
          <TouchableOpacity
            style={styles.passwordToggle}
            onPress={togglePasswordVisibility}
          >
            <Ionicons
              name={isPasswordVisible ? "eye-off-outline" : "eye-outline"}
              size={20}
              color={theme.colors.textSecondary}
            />
          </TouchableOpacity>
        )}
      </View>

      {error && (
        <View style={styles.errorContainer}>
          <Ionicons
            name="alert-circle"
            size={16}
            color={theme.colors.error}
            style={styles.errorIcon}
          />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {maxLength && (
        <Text style={styles.characterCount}>
          {value ? value.length : 0}/{maxLength}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.md,
  },
  label: {
    ...theme.textStyles.body,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
    fontWeight: theme.fonts.weight.medium,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  input: {
    flex: 1,
    backgroundColor: theme.colors.backgroundSecondary,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.md,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    ...theme.textStyles.body,
    color: theme.colors.textPrimary,
  },
  inputFocused: {
    borderColor: theme.colors.primary,
    borderWidth: 2,
  },
  inputError: {
    borderColor: theme.colors.error,
    borderWidth: 2,
  },
  inputDisabled: {
    backgroundColor: theme.colors.textDisabled + "20",
    color: theme.colors.textSecondary,
  },
  inputMultiline: {
    height: 80,
    paddingTop: theme.spacing.md,
  },
  inputIcon: {
    position: "absolute",
    left: theme.spacing.md,
    zIndex: 1,
  },
  passwordToggle: {
    position: "absolute",
    right: theme.spacing.md,
    zIndex: 1,
    padding: theme.spacing.xs,
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: theme.spacing.sm,
  },
  errorIcon: {
    marginRight: theme.spacing.xs,
  },
  errorText: {
    ...theme.textStyles.bodySmall,
    color: theme.colors.error,
    flex: 1,
  },
  characterCount: {
    ...theme.textStyles.caption,
    color: theme.colors.textSecondary,
    textAlign: "right",
    marginTop: theme.spacing.xs,
  },
});

export default CustomInput;
