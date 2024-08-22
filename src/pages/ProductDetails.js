import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from './../components/Header';
import './../styles/ProductDetails.css';
import defaultImage from './../assets/images/image-default.png';
import { useBag } from './../contexts/BagContext';

const ProductDetail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { addToBag } = useBag();
    const product = location.state?.product;

    if (!product) {
        return <p>Produto não encontrado.</p>;
    }

    const handleBackClick = () => {
        navigate(-1);
    };

    const handleAddToBag = () => {
        addToBag(product);
    };

    return (
        <div>
            <Header />
            <div className="container-data">
                <div className="images">
                    {product.fotos.map(picture => (
                        <img
                            key={picture.url}
                            src={picture.url || defaultImage}
                            alt={product.titulo}
                        />
                    ))}
                </div>
                <div className="description">
                    <h1 className="description-title">{product.titulo}</h1>
                    <p>{product.valor}</p>
                    <p className="description-product">{product.descricao}</p>
                    <div>
                        <h2 className="description-subtitle">Color:</h2>
                        <div className="container-colors">
                            {product.cores.map(color => (
                                <div
                                    className="description-color-view"
                                    key={color.codigo}
                                    style={{ backgroundColor: color.codigo }}
                                >
                                </div>
                            ))}
                        </div>
                    </div>
                    <h2 className="description-subtitle">Tamanhos:</h2>
                    <div className="description-sizes">
                        {product.tamanhos.map(size => (
                            <span className="size-item" key={size}>{size} </span>
                        ))}
                    </div>
                    <div class="actions-buttons">
                        <button className="button-add-bag" onClick={handleAddToBag}>Add to bag</button>
                        <button className="button-back" onClick={handleBackClick}>Back</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
