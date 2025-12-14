import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Slot } from "expo-router";

const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      retry:false,
    }
  }
});

export default function RootLayout() {
  console.log(process.env.EXPO_PUBLIC_API_URL);
  return (
    <QueryClientProvider client={queryClient}>
      <Slot />
    </QueryClientProvider>
  );
}
