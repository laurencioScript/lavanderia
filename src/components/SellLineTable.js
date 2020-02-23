// import React, { useState, useEffect } from 'react';
// import Select from 'react-select';

// import icon_close from './../public/icons/icon_close.png';

// function LineTable(props) {
//     // console.log('NASCEU ',props.id);
    
//     const [id, setId] = useState(0);
//     const [option, setOption] = useState(props.option);
//     const [amount, setAmount] = useState(1);
//     const [unity, setUnity] = useState("");
//     const [value_unity, setValueUnity] = useState(0);
//     const [value_total, setValueTotal] = useState(0);
//     const [show, setShow] = useState(true);
//     const [selectedPiece, setSelectedPiece] = useState("");
//     const [selectedCaract, setSelectedCaract] = useState("");
//     const [selectedDefect, setSelectedDefect] = useState("");
//     const [selectedColor, setSelectedColor] = useState("");

//     // Adivinha
//     const deleteItem = () => { 
//         // console.log('deleteItem LineTable',id);
//         console.log('Me apaga ',id);
        
//         props.removeItem({id});
//         // setShow(false); 
//     }

//     const calcuValueItemParcial = () => {  setValueTotal(value_unity * amount); }

//     const setAmountEvent = (event) => { setAmount(event.target.value); }

//     //Atualiza Peça Unidade e Valor Unitario sempre que o usuario alterar a peça
//     useEffect(()=>{
//         if(selectedPiece){
//             setUnity(selectedPiece.value.unity);
//             setValueUnity(selectedPiece.value.value);
//         }
//     },[selectedPiece])

//     // Atualiza o elemento Pai sempre que houver uma alteração
//     useEffect(()=>{
//         setId(props.id)
//         // console.log('loadComponent');
//         loadComponent();
//     },[id, amount, unity, value_unity, value_total, selectedPiece, selectedCaract, selectedDefect, selectedColor])

//     // Atualiza o valor Total Parcial sempre que houver alteração
//     useEffect(() => {
//         if(value_unity)
//             calcuValueItemParcial();
            
//     },[value_unity, amount])

    
//     const loadComponent = () => {
//         props.onChange({
//             id,
//             amount,
//             unity,
//             value_unity,
//             value_total,
//             selectedPiece,
//             selectedCaract,
//             selectedDefect,
//             selectedColor
//         })
//     }

//     return show ?
//         <tr  key={id} >
//             <td> <img src={icon_close} id="sellTableClose" onClick={deleteItem} /> </td>
//             <td><Select options={option.Pecas} onChange={setSelectedPiece} value={selectedPiece} /> </td>
//             <td><Select isMulti options={option.Cores} onChange={setSelectedColor} value={selectedColor} /></td>
//             <td><Select isMulti options={option.Caract} onChange={setSelectedCaract} value={selectedCaract} /></td>
//             <td><Select isMulti options={option.Defeitos} onChange={setSelectedDefect} value={selectedDefect} /></td>
//             <td><input type="number" defaultValue="1" min="1" value={amount} onChange={setAmountEvent} /></td>
//             <td>{unity}</td>
//             <td>{id}</td>
//             <td>R$ {value_unity}</td>
//             <td>R$ {value_total}</td>
//         </tr> : <></>;
// }
// export default LineTable;