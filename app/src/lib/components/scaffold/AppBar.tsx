import { ActionIcon, Center, Group, Header, Image, Menu } from "@mantine/core";
import { IconBrandGithub, IconLogout } from "@tabler/icons";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";
import { useSignOut } from "../../hooks/useSignOut";

const defaultPFP =
	"https://raw.githubusercontent.com/cat-milk/Anime-Girls-Holding-Programming-Books/master/Javascript/Chisaki_Tapris_Holding_JavaScript_Scope_and_Closure.png";

const AppBar = () => {
	const [user] = useAuthState(auth);
	const signOut = useSignOut();

	return (
		<Header height={60} p="xs">
			<Group position="apart">
				<Center>Debt</Center>

				<Group>
					<ActionIcon
						component={"a"}
						href={"https://github.com/KennanHunter/debt/"}
					>
						<IconBrandGithub height={45} width={45} />
					</ActionIcon>

					{user ? (
						<Menu transition="rotate-left" position="bottom-end">
							<Menu.Target>
								<Image
									src={user.photoURL || defaultPFP}
									height={45}
									width={45}
									radius={"sm"}
								/>
								{/* <Text>Epic</Text> */}
							</Menu.Target>
							<Menu.Dropdown>
								{/* <Menu.Label></Menu.Label> */}
								<Menu.Item
									icon={<IconLogout />}
									onClick={signOut}
								>
									Logout
								</Menu.Item>
							</Menu.Dropdown>
						</Menu>
					) : (
						<></>
					)}
				</Group>
			</Group>
		</Header>
	);
};

export default AppBar;
