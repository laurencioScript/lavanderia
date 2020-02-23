import React, { useState, useEffect } from 'react';
import './sellTable.css';
import LineTable from './SellLineTable';
import icon_close from './../public/icons/icon_close.png';
import Select from 'react-select';

import PieceService from './../service/PiecesService';
import ColorService from './../service/ColorsService';
import CharacService from './../service/CharacService';
import DefectService from './../service/DefectService';


function Selltable(props) {

    const [itens, setItens] = useState([]);
    const [option, setOption] = useState([]);
    const [contItem, setContIten] = useState(1);


    const loadOption = () => {
        // console.log('loadOption');

        // Carrega os dados necessarios para colocar nos elementos Selects
        let Option = {
            Pecas: [],
            Cores: [],
            Caract: [],
            Defeitos: []
        };

        Promise.all([PieceService.getPieces(), ColorService.getColors(), CharacService.getCharacteristics()
            , DefectService.getDefects()]).then((result) => {
                let Pecas = result[0], Cores = result[1], Caract = result[2], Defeitos = result[3];
                Pecas.map(Peca => { Option.Pecas.push({ value: Peca, label: Peca.piece_name }); });
                Cores.map(cor => { Option.Cores.push({ value: cor, label: cor.color_name }); });
                Caract.map(caract => { Option.Caract.push({ value: caract, label: caract.characteristic_name }); });
                Defeitos.map(Defeitos => { Option.Defeitos.push({ value: Defeitos, label: Defeitos.defect_name }); });

                setOption(Option);

            });

    }

    useEffect(() => {
        if (option.length < 1) {
            loadOption();
        }
    }, [option])

    const createItem = () => {

        itens.push({
            id: contItem,
            amount: 1,
            unity: "",
            value_unity: 0,
            value_parcial: 0,
            selectedPiece: "",
            selectedCaract: [],
            selectedDefect: [],
            selectedColor: []
        })

        setContIten(contItem + 1);
    }

    const deleteItem = (id) => {
        const result = itens.filter(i => i.id != id)
        setItens(result);
    }

    useEffect(() => {
        console.log('Update ', itens);
        props.updateItens(itens)

    }, [itens])

    const setPiece = (iten, value) => {
        iten.value_unity = value.value.value;
        iten.unity = value.value.unity;
        iten.selectedPiece = value.label;
        iten.value_parcial = iten.amount * iten.value_unity;
        const result = itens.map(i => i.id == iten.id ? iten : i );
        setItens(result);
    }

    const setColor = (iten, colors) => {

        if(colors && !Array.isArray(colors)){
            iten.selectedColor.push(colors.label);
        }
        if(Array.isArray(colors)){
            for (let color of colors) {
                iten.selectedColor.push(color.label);
            }
        }
        const result = itens.map(i => i.id == iten.id ? iten : i );
        setItens(result);
    }

    const setDefect = (iten, defects) => {
        
        if(defects && !Array.isArray(defects)){
            iten.selectedDefect.push(defects.label);
        }
        if(Array.isArray(defects)){
            for (let def of defects) {
                iten.selectedDefect.push(def.label);
            }
        }
        const result = itens.map(i => i.id == iten.id ? iten : i );
        setItens(result);
    }

    const setAmount = (iten, e) => {
        iten.amount = e.target.value;
        iten.value_parcial = e.target.value * iten.value_unity;
        const result = itens.map(i => i.id == iten.id ? iten : i );
        setItens(result);
    }

    const setCaract = (iten, caracts) => {

        if(caracts && !Array.isArray(caracts)){
            iten.selectedCaract.push(caracts.label);
        }
        if(Array.isArray(caracts)){
            for (let cart of caracts) {
                iten.selectedCaract.push(cart.label);
            }
        }
        const result = itens.map(i => i.id == iten.id ? iten : i );
        setItens(result);
    }

    return (
        <>
            <table className="itenTable">
                <thead>
                    <tr>
                        <td></td>
                        <td>Id</td>
                        <td>Peças</td>
                        <td>Cores</td>
                        <td>Caracteristicas</td>
                        <td>Defeitos</td>
                        <td>Qtd</td>
                        <td>Unidade</td>
                        <td>Val_Unit</td>
                        <td>Val_Parcial</td>
                    </tr>
                </thead>

                <tbody id="itenTbody">
                    {
                        itens.map(iten => {
                            return (
                                <tr key={iten.id} >
                                    <td> <img src={icon_close} id="sellTableClose" onClick={() => { deleteItem(iten.id) }} /> </td>
                                    <td>{iten.id}</td>
                                    <td><Select options={option.Pecas} onChange={(e) => { setPiece(iten, e) }} /> </td>
                                    <td><Select isMulti options={option.Cores} onChange={(e) => { setColor(iten, e) }} /></td>
                                    <td><Select isMulti options={option.Caract} onChange={(e) => { setCaract(iten, e) }} /></td>
                                    <td><Select isMulti options={option.Defeitos} onChange={(e) => { setDefect(iten, e) }} /></td>
                                    <td><input type="number" defaultValue="1" min="1" value={iten.amount} onChange={event => setAmount(iten, event)} /></td>
                                    <td>{iten.unity}</td>
                                    <td>R$ {iten.value_unity}</td>
                                    <td>R$ {iten.value_parcial}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>

            </table>

            <input id="RVadiconaLinha" type="button" value="Adicionar Item" onClick={createItem} />
        </>
    );

}

export default Selltable;