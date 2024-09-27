import { Box } from '@mui/material';
import { NavbarContainer } from './NavbarContainer';
import { NavbarLogo } from './NavbarLogo';
import { NavbarLink } from './NavbarLink';
import { NavbarButton } from './NavbarButton';

export default function GeneralNavbar() {
    return (
        <NavbarContainer>
            {/* Left Side: Logo */}
            <NavbarLogo />

            {/* Middle: Navigation Links */}
            <Box sx={{ display: 'flex', gap: 3, flexGrow: 1, alignItems: 'center', marginLeft: '30px' }}>
                <NavbarLink text="Home" path="/home" />
                <NavbarLink text="Profile" path="/profile" />
                <NavbarLink text="History" path="/history" />
                <NavbarLink text="Questions" path="/questions" />
            </Box>

            {/* Right Side: Logout Button */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <NavbarButton
                    to="/logout"
                    color="#8576FF"
                    textColor="#fff"
                    hoverColor="#6a4bcf"
                >
                    Logout
                </NavbarButton>
            </Box>
        </NavbarContainer>
    );
}
