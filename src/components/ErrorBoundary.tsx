import React, { ReactNode } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

type Props = {
  children: ReactNode;
  fallback?: ReactNode;
};

type State = {
  hasError: boolean;
  errorMessage: string;
};

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, errorMessage: "" };
  }

  static getDerivedStateFromError(error: Error) {
    return {
      hasError: true,
      errorMessage: error.message || "कोई अनपेक्षित त्रुटि हुई"
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error for debugging
    console.error("Error caught by boundary:", error, errorInfo);
  }

  onReset = () => {
    this.setState({ hasError: false, errorMessage: "" });
  };

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <View style={styles.errorContainer}>
            <Text style={styles.errorTitle}>त्रुटि!</Text>
            <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
            <TouchableOpacity style={styles.retryButton} onPress={this.onReset}>
              <Text style={styles.retryText}>पुनः प्रयास करें</Text>
            </TouchableOpacity>
          </View>
        )
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: "#f9f5ff"
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#d32f2f",
    marginBottom: 8,
    fontFamily: "NotoSansDevanagari"
  },
  errorMessage: {
    fontSize: 14,
    textAlign: "center",
    color: "#555",
    marginBottom: 24,
    fontFamily: "NotoSansDevanagari"
  },
  retryButton: {
    backgroundColor: "#6a0dad",
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20
  },
  retryText: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "NotoSansDevanagari"
  }
});
