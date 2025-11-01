import { ReactNode } from "react";
import { AuthProvider } from "./auth-context";
import { Provider} from "react-redux";
import { store } from "../../store";
import { QueryClient, QueryClientProvider } from "react-query";
export const AppProvides=({children}:{children:ReactNode})=>{
    const queryClient = new QueryClient();
    return <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>{children}</AuthProvider>
      </QueryClientProvider>
    </Provider>
}
       
