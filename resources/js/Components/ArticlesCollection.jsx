import ArticuloExplorar from "./ArticlesExplorar";


ArticuloExplorar
export default function ArticlesCollection (){
    return (
        <div className='bg-gray-200 w-4/5 rounded-lg p-6 m-auto my-4'>
            <ArticuloExplorar/>
            <br></br>
            <ArticuloExplorar/>
        </div>
    );
}