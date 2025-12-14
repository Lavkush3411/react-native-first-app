import useLogout from "@/hooks/useLogout";
import { Button, Text } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { mutate: logout, isPending } = useLogout();
  const handleLogout = () => {
    logout();
  }
  return (
  <SafeAreaView>  
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Button title="Logout" onPress={handleLogout} />
    </SafeAreaView>
  );
}
