/**
 * CustomButton Component - Reusable button with different variants
 *
 * @param {string} title - Button text
 * @param {function} onPress - Press handler
 * @param {string} variant - Button style variant: 'primary' | 'secondary' | 'outline'
 * @param {boolean} disabled - Disabled state
 * @param {boolean} loading - Loading state
 * @param {string} icon - Optional Ionicons icon name
 * @param {object} style - Additional styles
 */

import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import theme from "../../theme";

const CustomButton = ({
  title,
  onPress,
  variant = "primary",
  disabled = false,
  loading = false,
  icon,
  style,
  textStyle,
}) => {
  const getButtonStyle = () => {
    const baseStyle = [styles.button];

    if (disabled || loading) {
      baseStyle.push(styles.buttonDisabled);
    } else {
      switch (variant) {
        case "primary":
          baseStyle.push(styles.buttonPrimary);
          break;
        case "secondary":
          baseStyle.push(styles.buttonSecondary);
          break;
        case "outline":
          baseStyle.push(styles.buttonOutline);
          break;
        default:
          baseStyle.push(styles.buttonPrimary);
      }
    }

    return baseStyle;
  };

  const getTextStyle = () => {
    const baseStyle = [styles.buttonText];

    if (disabled || loading) {
      baseStyle.push(styles.buttonTextDisabled);
    } else {
      switch (variant) {
        case "primary":
          baseStyle.push(styles.buttonTextPrimary);
          break;
        case "secondary":
          baseStyle.push(styles.buttonTextSecondary);
          break;
        case "outline":
          baseStyle.push(styles.buttonTextOutline);
          break;
        default:
          baseStyle.push(styles.buttonTextPrimary);
      }
    }

    return baseStyle;
  };

  const getIconColor = () => {
    if (disabled || loading) {
      return theme.colors.textDisabled;
    }

    switch (variant) {
      case "primary":
        return theme.colors.textLight;
      case "secondary":
        return theme.colors.textLight;
      case "outline":
        return theme.colors.primary;
      default:
        return theme.colors.textLight;
    }
  };

  return (
    <TouchableOpacity
      style={[...getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      <View style={styles.buttonContent}>
        {loading ? (
          <ActivityIndicator
            size="small"
            color={getIconColor()}
            style={styles.loadingIndicator}
          />
        ) : (
          icon && (
            <Ionicons
              name={icon}
              size={20}
              color={getIconColor()}
              style={styles.buttonIcon}
            />
          )
        )}
        <Text style={[...getTextStyle(), textStyle]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: theme.borderRadius.md,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 48,
    ...theme.shadows.sm,
  },
  buttonPrimary: {
    backgroundColor: theme.colors.primary,
  },
  buttonSecondary: {
    backgroundColor: theme.colors.secondary,
  },
  buttonOutline: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  buttonDisabled: {
    backgroundColor: theme.colors.textDisabled,
    borderColor: theme.colors.textDisabled,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    ...theme.textStyles.button,
    textAlign: "center",
  },
  buttonTextPrimary: {
    color: theme.colors.textLight,
  },
  buttonTextSecondary: {
    color: theme.colors.textLight,
  },
  buttonTextOutline: {
    color: theme.colors.primary,
  },
  buttonTextDisabled: {
    color: theme.colors.textLight,
  },
  buttonIcon: {
    marginRight: theme.spacing.sm,
  },
  loadingIndicator: {
    marginRight: theme.spacing.sm,
  },
});

export default CustomButton;
