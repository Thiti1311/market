import React from 'react';
import { Link } from 'react-router-dom';
import './../styles/MainProducts.css';
import defaultImage from './../assets/images/image-default.png';

const MainProducts = ({ products }) => {

    function getCover(photos) {
        return photos.find(picture => picture.capa)?.url || photos.find(picture => picture.url).url || defaultImage;
    }

    return (
        <div className="main-container">
            <div className="info-total-products">
                <p>Showing {products.length} products</p>
            </div>
            <div className="products-container">
                {products.map(product => (
                    <Link
                        to={`/product/${product.id}`}
                        state={{ product }}
                        key={product.id}
                        className="product-link"
                    >
                        <div className="product-item">
                            <img
                                src={getCover(product.fotos)}
                                alt={product.titulo}
                                className="product-image"
                            />
                            <div className="product-details">
                                <h2 className="product-title">{product.titulo}</h2>
                                <div className="product-info">
                                    <p className="product-category">{product.categoria}</p>
                                    <p className="product-price">{product.valor}</p>
                                </div>
                                <div className="product-colors">
                                    {product.cores.map(color => (
                                        <div
                                            className="description-color-view"
                                            key={color.codigo}
                                            style={{ backgroundColor: color.codigo }}
                                        >
                                        </div>
                                    ))}
                                </div>
                                <div className="product-sizes">
                                    {product.tamanhos.map(size => (
                                        <span key={size} className="size-item">
                                            {size}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default MainProducts;
