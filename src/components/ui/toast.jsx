import * as React from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

const ToastContext = React.createContext({});

export function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  const addToast = React.useCallback(({ title, description, variant = "default" }) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, title, description, variant }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  }, []);

  const removeToast = React.useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 max-w-[420px]">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={cn(
              "rounded-lg border px-6 py-4 shadow-lg transition-all bg-background text-foreground",
              toast.variant === "destructive" && "border-destructive bg-destructive text-white"
            )}
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                {toast.title && <div className="text-sm font-semibold">{toast.title}</div>}
                {toast.description && <div className="text-sm opacity-90">{toast.description}</div>}
              </div>
              <button onClick={() => removeToast(toast.id)} className="opacity-70 hover:opacity-100">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = React.useContext(ToastContext);
  return { toast: context.addToast };
}
