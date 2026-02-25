import { Theme, presetGpnDefault } from "@consta/uikit/Theme";
import { Layout } from "@consta/uikit/Layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import styles from "./App.module.css";
import { ProjectsPage } from "pages/projects/ui/ProjectsPage";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Theme preset={presetGpnDefault}>
        <Layout direction="column" className={styles.page}>
          <ProjectsPage />
        </Layout>
      </Theme>
    </QueryClientProvider>
  );
}

export default App;
