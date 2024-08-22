export const getProducts = async () => {
    try {
        const response = await fetch('https://gist.githubusercontent.com/thiagossampaio/060e82b4801b0841fc683b0ce5efa06d/raw/e3cc555d9c71fd1b1160e20d7b10c083b5abcd61/desafio_front_end');
        const data = await response.json();
        
        let i = 0;
        const products = data.map(product => ({
            ...product,
            id: i++
        }));

        const categories = [...new Set(data.map(product => product.categoria))]; 

        const colors = data
        .flatMap(product => product.cores)
        .reduce((findedColors, color) => {
          if (!findedColors.some(existingColor => existingColor.codigo === color.codigo)) {
            findedColors.push(color);
          }
          return findedColors;
        }, []);
      
        return { products, categories, colors };
    } catch (error) {
        console.error('Produtos não encontrados:', error);
        return { products: [], categories: [], colors: []};
    }
};
