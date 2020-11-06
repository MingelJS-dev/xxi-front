export const isAdmin = (role) => role === 'admin';
export const isClient = (role) => role === 'cliente';
export const isKitchen = (role) => role === 'cocina';
export const isFinance = (role) => role === 'finanzas';
export const isCellar = (role) => role === 'bodega';

export const supplieView = (role) => {
    return isAdmin(role) || isCellar(role)
}

export const  productView = (role) => {
    return isAdmin(role) || isKitchen(role)
}

export const tableView = (role) => {
    return isAdmin(role)
}

export const userView = (role) => {
    return isAdmin(role)
}

