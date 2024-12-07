import { Tabs } from "@chakra-ui/react";
import { BsBookmark, BsGrid3X3, BsSuitHeart } from "react-icons/bs";
// import { LuUser, LuFolder, LuCheckSquare } from "react-icons/lu";

const ProfileTags = () => {
  return (
    <>

      <Tabs.Root defaultValue="members" >
        <Tabs.List w={"full"}
          justifyContent={'space-between'}
          gap={{ base: 4, sm: 10 }}
          textTransform={"uppercase"}
          fontWeight={"bold"}>
          <Tabs.Trigger value="members">
            <BsGrid3X3 />
            {/* <LuUser /> */}
            Profile
          </Tabs.Trigger>
          <Tabs.Trigger value="projects">
            <BsBookmark />
            {/* <LuFolder /> */}
            Save
          </Tabs.Trigger>

          <Tabs.Trigger value="tasks">
            <BsSuitHeart fontWeight={"bold"} />
            {/* <LuCheckSquare /> */}
            Love
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="members" fontSize={12} p={2} display={{ base: "none", sm: "block" }}>
          My profile is very well</Tabs.Content>
        <Tabs.Content value="projects" fontSize={12} p={2} display={{ base: "none", sm: "block" }}>
          I save my posts </Tabs.Content>
        <Tabs.Content value="tasks" fontSize={12} p={2} display={{ base: "none", sm: "block" }}>
          I love my friends
        </Tabs.Content>


      </Tabs.Root>

    </>
  )
}

export default ProfileTags
