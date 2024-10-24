import DatePicker from "./features/filters/components/DatePicker.tsx";
import Home from "./pages/Home.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
      <DatePicker />
    </>
  );
}

export default App;
