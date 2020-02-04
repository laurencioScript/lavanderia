import React, { useState,useEffect } from 'react';
import Select from 'react-select';

import icon_close from './../public/icons/icon_close.png';

function LineTable(props) {
    
    const [id, setId] = useState(props.id);
    const [option, setOption] = useState(props.option);
    const [amount, setAmount] = useState(1);
    const [unity, setUnity] = useState("");
    const [value_unity, setValueUnity] = useState(0);
    const [value_total, setValueTotal] = useState(0);
    const [show, setShow] = useState(true);
    const [selectedPiece, setSelectedPiece] = useState("");
    const [selectedCaract, setSelectedCaract] = useState("");
    const [selectedDefect, setSelectedDefect] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
   
    // Adivinha
    const deleteItem = () => { setShow(false); }

    const calcuValueItemParcial = () => { setValueTotal(value_unity * amount); }

    const setAmountEvent = (event)=>{ setAmount(event.target.value); }

    //Atualiza Peça Unidade e Valor Unitario sempre que o usuario alterar a peça
    const updateItem = (Piece)=>{
        const { value } = Piece;
        setSelectedPiece(Piece)
        setUnity(value.unity);
        setValueUnity(value.value);
    }
    
    useEffect(()=>{
        
        // Atualiza o valor Total Parcial sempre que houver alteração
        calcuValueItemParcial();
        
        // Atualiza o elemento Pai sempre que houver uma alteração
        
    })

    const teste = ()=>{
        
        props.onChange({ id, amount, unity, value_unity, value_total, selectedPiece, selectedCaract, selectedDefect, selectedColor });
    }
   
    return show ? 
        <tr onClick={teste} key={id} >
            <td> <img src={icon_close} id="sellTableClose" onClick={deleteItem} /> </td>
            <td><Select options={option.Pecas} onChange={updateItem} value={selectedPiece}/> </td>
            <td><Select isMulti options={option.Cores} onChange={setSelectedColor} value={selectedColor}/></td>
            <td><Select isMulti options={option.Caract} onChange={setSelectedCaract} value={selectedCaract} /></td>
            <td><Select isMulti options={option.Defeitos} onChange={setSelectedDefect} value={selectedDefect} /></td>
            <td><input type="number" defaultValue="1" min="1"  value={amount} onChange={setAmountEvent} /></td>
            <td>{unity}</td>
            <td>R$ {value_unity}</td>
            <td>R$ {value_total}</td>
        </tr> : <></>;
}
    export default LineTable;