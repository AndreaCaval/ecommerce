import { Fragment, useContext } from 'react'
import { Outlet } from 'react-router-dom'

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'

import CartIcon from '../../components/cart-icon/cart-icon.component'
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component'

import { UserContext } from '../../contexts/user.context'
import { CartContext } from '../../contexts/cart.context'

import { signOutUser } from '../../utils/firebase/firebase.utils'

import {NavigationContainer, NavigationLink, NavigationLinksContainer, LogoContainer} from './navigation.styles'

const Navigation = () => {
    const { currentUser } = useContext(UserContext)
    const { isCartOpen } = useContext(CartContext)

    return (
        <Fragment>
            <NavigationContainer>
                <LogoContainer to={'/'}>
                    <CrwnLogo className='logo' />
                </LogoContainer>
                <NavigationLinksContainer>
                    <NavigationLink to={'/shop'}>
                        SHOP
                    </NavigationLink>
                    {
                        currentUser ? (
                            <NavigationLink as='span' onClick={signOutUser}>SIGN OUT</NavigationLink>
                        ) : (
                            <NavigationLink to={'/auth'}>
                                SIGN IN
                            </NavigationLink>
                        )
                    }
                    <CartIcon />
                </NavigationLinksContainer>
                {isCartOpen && <CartDropdown />}
            </NavigationContainer>
            <Outlet />
        </Fragment>
    )
}

export default Navigation;
