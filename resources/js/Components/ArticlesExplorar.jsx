import libro from '../../Books/el arte de vender mierda.jpg'


export default function ArticuloExplorar(){
    return (
        <div>
            <article className='bg-white p-4 rounded-lg flex'>
                <img className='w-24 m-2' src={libro} alt="" /> 
                <h2>¡Uno de los mejores libros que he leído!</h2>
            </article>
        </div>
        
    )
}