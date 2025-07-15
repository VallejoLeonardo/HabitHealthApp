/**
 * DataModal Component - Reusable modal for data input and display
 *
 * @param {boolean} visible - Modal visibility
 * @param {function} onClose - Close handler
 * @param {function} onSave - Save handler
 * @param {string} title - Modal title
 * @param {ReactNode} children - Modal content
 */

import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import theme from "../../theme";
import CustomButton from "./CustomButton";

const DataModal = ({
  visible = false,
  onClose,
  onSave,
  title,
  children,
  saveButtonTitle = "Guardar",
  cancelButtonTitle = "Cancelar",
  showSaveButton = true,
  showCancelButton = true,
  saveButtonDisabled = false,
  isLoading = false,
  style,
}) => {
  const handleBackdropPress = () => {
    if (onClose) {
      onClose();
    }
  };

  const handleSavePress = () => {
    if (onSave) {
      onSave();
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={handleBackdropPress}>
        <View style={styles.backdrop}>
          <TouchableWithoutFeedback>
            <View style={[styles.modalContainer, style]}>
              <SafeAreaView style={styles.modal}>
                {/* Header */}
                <View style={styles.header}>
                  <Text style={styles.title}>{title}</Text>
                  {onClose && (
                    <TouchableOpacity
                      style={styles.closeButton}
                      onPress={onClose}
                    >
                      <Ionicons
                        name="close"
                        size={24}
                        color={theme.colors.textSecondary}
                      />
                    </TouchableOpacity>
                  )}
                </View>

                {/* Content */}
                <ScrollView
                  style={styles.content}
                  showsVerticalScrollIndicator={false}
                  keyboardShouldPersistTaps="handled"
                >
                  {children}
                </ScrollView>

                {/* Footer */}
                {(showSaveButton || showCancelButton) && (
                  <View style={styles.footer}>
                    {showCancelButton && (
                      <CustomButton
                        title={cancelButtonTitle}
                        onPress={onClose}
                        variant="outline"
                        style={styles.footerButton}
                      />
                    )}

                    {showSaveButton && (
                      <CustomButton
                        title={saveButtonTitle}
                        onPress={handleSavePress}
                        variant="primary"
                        disabled={saveButtonDisabled}
                        loading={isLoading}
                        style={styles.footerButton}
                      />
                    )}
                  </View>
                )}
              </SafeAreaView>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: theme.colors.overlay,
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: theme.colors.background,
    borderTopLeftRadius: theme.borderRadius.lg,
    borderTopRightRadius: theme.borderRadius.lg,
    maxHeight: "90%",
    minHeight: "50%",
    ...theme.shadows.lg,
  },
  modal: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  title: {
    ...theme.textStyles.h3,
    color: theme.colors.textPrimary,
    flex: 1,
  },
  closeButton: {
    padding: theme.spacing.xs,
    marginLeft: theme.spacing.md,
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
  },
  footer: {
    flexDirection: "row",
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    gap: theme.spacing.md,
  },
  footerButton: {
    flex: 1,
  },
});

export default DataModal;
