import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import Card from './Card';


function App({ setMenosValor, setAll, setMasValor, setsearch }) {
    const url = "https://apposcarsue.herokuapp.com/movies/";
    const [peli, setPeli] = useState([])
    const [end, setEnd] = useState(20)
    console.log(setMenosValor, setAll, setMasValor)



    const peticionGet = async (url1) => {
        const res = await fetch(url1);
        const data = await res.json();
        console.log(data)

        setPeli(data)
    }

    useEffect(() => {

        console.log(setsearch)
        window.scroll({ top: 0 })
        setEnd(20)

        console.log("entro")
        peticionGet(url)


    }, [setMenosValor, setAll, setMasValor, setsearch])

    let peli2 = peli
    if (setsearch && setsearch !== '') {

        setsearch = setsearch.toLowerCase();
        peli2 = peli.filter(movie => movie.title.toLowerCase().includes(setsearch));

    }
    let peli1 = peli2;

    if (setMasValor) {
        
        console.log("entro mas")
        peli1 = peli2.filter(fil => fil.vote_average >= 7)

    }
    if (setMenosValor) {
        console.log("entro menos")
        peli1 = peli2.filter(fil => fil.vote_average < 7)
        
    }

    console.log(end)
    console.log(peli)
    let peliImp = peli1.slice(0, end)
    return (
        <>
       
   
            <InfiniteScroll
                dataLength={peliImp.length}
                next={() => setEnd(end + 2)}
                hasMore={true}
            >
             <div style={{padding: "20px",display:"grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr" }}>
                {

                    peliImp.map((img, index) => {

                        return (
                           
                            <Card
                                key={index}
                                data152={img}
                            />    
                             )
                    })
                }
                       
                        </div>
            </InfiniteScroll>


        </>
    )
}

export default App


