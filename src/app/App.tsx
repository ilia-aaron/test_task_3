import { Theme, presetGpnDefault } from "@consta/uikit/Theme";
import { Layout } from "@consta/uikit/Layout";
import styles from "./App.module.css";
import { ProjectsPage } from "pages/projects/ui/ProjectsPage";

function App() {
  return (
    <Theme preset={presetGpnDefault}>
      <Layout direction="column" className={styles.page}>
        <ProjectsPage />
      </Layout>
    </Theme>
  );
}

export default App;
