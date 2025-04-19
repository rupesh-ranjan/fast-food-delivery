import { useRouteError, Link } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();

  // Log error for debugging
  console.error("Routing Error:", error);

  // Default values for error message
  const status = error?.status || 404;
  const statusText = error?.statusText || "Page Not Found";
  const errorMessage =
    error?.data?.message || error?.message || "Unknown error occurred";
  const isNotFound = status === 404;
  const isServerError = status >= 500;

  // Get human-friendly status message
  const getStatusMessage = () => {
    if (isNotFound) return "Oops! The page you're looking for doesn't exist.";
    if (isServerError) return "Something went wrong on our server.";
    return "An unexpected error occurred.";
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl text-center space-y-6">
        {/* Error Illustration */}
        <div className="text-9xl text-blue-600 font-bold animate-bounce">
          {status}
        </div>

        {/* Main Message */}
        <h1 className="text-4xl font-bold text-gray-800">
          {getStatusMessage()}
        </h1>

        {/* Technical Details */}
        <div className="space-y-2">
          <p className="text-lg text-gray-600">{errorMessage}</p>
          {statusText && statusText !== errorMessage && (
            <p className="text-gray-500 text-sm">
              (Technical description: {statusText})
            </p>
          )}
        </div>

        {/* Recovery Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Return to Homepage
          </Link>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
          >
            Reload Page
          </button>
        </div>

        {/* Additional Help */}
        <p className="text-gray-500 text-sm mt-8">
          Need help? Contact our support team at{" "}
          <a
            href="mailto:support@example.com"
            className="text-blue-600 hover:underline"
          >
            support@fastfooddelivery.com
          </a>
        </p>
      </div>
    </div>
  );
}

export default ErrorPage;
