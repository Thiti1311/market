export const getCategories = async () => {
    try {

        const response = await fetch('https://gist.githubusercontent.com/thiagossampaio/060e82b4801b0841fc683b0ce5efa06d/raw/e3cc555d9c71fd1b1160e20d7b10c083b5abcd61/desafio_front_end');
        const data = await response.json();
        
        return [...new Set(data.map(product => product.categoria))];
        
    } catch (error) {
        console.error('Produtos não encontrados:', error);
        return [];
    }
};

export const filterProducts = (products, query) => {
    if (!query) return products; 

    const lowerCaseQuery = query.toLowerCase();

    return products.filter(product => {
        return (
            product.titulo.toLowerCase().includes(lowerCaseQuery) ||
            product.descricao.toLowerCase().includes(lowerCaseQuery) ||
            product.cores.some(color => color.nome.toLowerCase().includes(lowerCaseQuery)) ||
            product.categoria.toLowerCase().includes(lowerCaseQuery)
        );
    });
};

