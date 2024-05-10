import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';


export default function CarouselBooks(){
    const handleDragStart = (e) => e.preventDefault();
    const responsive = {
        0: { items: 1 },
        568: { items: 2 },
        1024: { items: 5 },
    };

    const items = [
        <a href={route('login')}><img src="https://www.imprentaonline.net/blog/wp-content/uploads/DALL%C2%B7E-2023-10-16-10.41.49-Illustration-depicting-a-humanoid-robot-with-half-of-its-face-transparent-revealing-intricate-circuits-and-gears-inside.-The-robot-is-holding-a-light-1.png" onDragStart={handleDragStart} role="presentation" /></a>,
        <a href={route('login')}><img src="https://previews.123rf.com/images/aprillrain/aprillrain2212/aprillrain221200638/196354278-imagen-de-caricatura-de-un-astronauta-sentado-en-una-luna-ilustraci%C3%B3n-de-alta-calidad.jpg" onDragStart={handleDragStart} role="presentation" /></a>,
        <a href={route('login')}><img src="https://educacionplasticayvisual.com/wp-content/uploads/imagen-funcion-estetica.jpg" onDragStart={handleDragStart} role="presentation" /></a>,
        <a href={route('login')}><img src="https://marketing4ecommerce.net/wp-content/uploads/2023/08/imagen-generada-con-la-IA-Stable-Diffusion-XL-desde-Clipdrop-1-e1691490805983.jpg" onDragStart={handleDragStart} role="presentation" /></a>,
        <a href={route('login')}><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT25pHPbF9O7EWzSyRh-mqfd6WFZ8TrHAFmvdb_LB5n-Q&s" onDragStart={handleDragStart} role="presentation" /></a>,
        <a href={route('login')}><img src="https://www.imprentaonline.net/blog/wp-content/uploads/DALL%C2%B7E-2023-10-16-10.41.49-Illustration-depicting-a-humanoid-robot-with-half-of-its-face-transparent-revealing-intricate-circuits-and-gears-inside.-The-robot-is-holding-a-light-1.png" onDragStart={handleDragStart} role="presentation" /></a>,
        <a href={route('login')}><img src="https://previews.123rf.com/images/aprillrain/aprillrain2212/aprillrain221200638/196354278-imagen-de-caricatura-de-un-astronauta-sentado-en-una-luna-ilustraci%C3%B3n-de-alta-calidad.jpg" onDragStart={handleDragStart} role="presentation" /></a>,
        <a href={route('login')}><img src="https://educacionplasticayvisual.com/wp-content/uploads/imagen-funcion-estetica.jpg" onDragStart={handleDragStart} role="presentation" /></a>,
        <a href={route('login')}><img src="https://marketing4ecommerce.net/wp-content/uploads/2023/08/imagen-generada-con-la-IA-Stable-Diffusion-XL-desde-Clipdrop-1-e1691490805983.jpg" onDragStart={handleDragStart} role="presentation" /></a>,
        <a href={route('login')}><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT25pHPbF9O7EWzSyRh-mqfd6WFZ8TrHAFmvdb_LB5n-Q&s" onDragStart={handleDragStart} role="presentation" /></a>,
        <a href={route('login')}><img src="https://www.imprentaonline.net/blog/wp-content/uploads/DALL%C2%B7E-2023-10-16-10.41.49-Illustration-depicting-a-humanoid-robot-with-half-of-its-face-transparent-revealing-intricate-circuits-and-gears-inside.-The-robot-is-holding-a-light-1.png" onDragStart={handleDragStart} role="presentation" /></a>,
        <a href={route('login')}><img src="https://previews.123rf.com/images/aprillrain/aprillrain2212/aprillrain221200638/196354278-imagen-de-caricatura-de-un-astronauta-sentado-en-una-luna-ilustraci%C3%B3n-de-alta-calidad.jpg" onDragStart={handleDragStart} role="presentation" /></a>,
        <a href={route('login')}><img src="https://educacionplasticayvisual.com/wp-content/uploads/imagen-funcion-estetica.jpg" onDragStart={handleDragStart} role="presentation" /></a>,
        <a href={route('login')}><img src="https://marketing4ecommerce.net/wp-content/uploads/2023/08/imagen-generada-con-la-IA-Stable-Diffusion-XL-desde-Clipdrop-1-e1691490805983.jpg" onDragStart={handleDragStart} role="presentation" /></a>,
        <a href={route('login')}><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT25pHPbF9O7EWzSyRh-mqfd6WFZ8TrHAFmvdb_LB5n-Q&s" onDragStart={handleDragStart} role="presentation" /></a>,
    ];
        
    const Gallery = () => <AliceCarousel mouseTracking items={items} responsive={responsive} animationType='fadeout'/>;
return(
    Gallery()
)};


