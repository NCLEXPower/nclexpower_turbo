import React, { Component, ReactNode } from "react";
import { Box, Typography, Button } from "@mui/material";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  context?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

export class ErrorBoundaryV2 extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(
      "ErrorBoundary caught:",
      error,
      errorInfo,
      this.props.context
    );
    this.setState({ errorInfo });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            p={4}
            height="100%"
            border={1}
            borderColor="error.main"
            borderRadius={1}
          >
            <Typography variant="h6" color="error" gutterBottom>
              Something went wrong
              {this.props.context ? ` in ${this.props.context}` : ""}
            </Typography>
            <Typography variant="body1" paragraph>
              {this.state.error?.message || "Unknown error"}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleReset}
              sx={{ mt: 2 }}
            >
              Try Again
            </Button>
          </Box>
        )
      );
    }

    return this.props.children;
  }
}
