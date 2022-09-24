import React, { useState, useEffect, createContext, useCallback } from "react";
import Papa from "papaparse";
import { CSVLink } from "react-csv";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import '@testing-library/jest-dom';
import './App.css';
import Child1 from "./components/Child1";
import { Child2 } from "./components/Child2";


const allowedExtensions = ["vnd.ms-excel"];

export const UserContext = createContext();

const App3 = () => {

    const [first, setfirst] = useState(0);
    const [users, setusers] = useState([
        {
            name: "ali",
            fname:"murtaza"
        },
        {
            name: "ali",
            fname:"murtaza"
        },
        {
            name: "ali",
            fname:"murtaza"
        },
        {
            name: "ali",
            fname:"murtaza"
        }
    ]);

    useEffect(() => {
        console.log("app called") 
       })
    
    const addUser = useCallback(() => {

    setusers((t) => [...users, {
        name: "ali",
        fname:"murtaza"
    }]);
    }, [users]);

    return (
        <UserContext.Provider value={users}>
                main component
                i am {first}
                <button onClick={() => setfirst(first+1)}>change 1st</button>
            <Child1 users={users} addUser={addUser} />
            <Child2 users={users} />
        </UserContext.Provider>
    )
}

const App = () => {
	
	const [error, setError] = useState("");
	const [file, setFile] = useState("");
	const [data, setData] = useState();
    const btnClass= "MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary";

	const handleFileChange = (e) => {
		setError("");
		
		// Check if user has entered the file
		if (e.target.files.length) {
			const inputFile = e.target.files[0];

			const fileExtension = inputFile?.type.split("/")[1];

			if (!allowedExtensions.includes(fileExtension)) {
				setError("Please input a Comma Delimited CSV file");
                setFile({})
				return;
			}
			setFile(inputFile);
		}
	};

	const handleParse = (fileName) => {
        
		if (!file) return setError("Enter a valid file");

		const reader = new FileReader();
		
		reader.onload = async ({ target }) => {
			const csv = Papa.parse(target.result, { header: false });
			const parsedData = csv?.data;
            
            if(!parsedData[0][2]) return setError("Number of rows must be atleast 1");

            if( !10000 > parsedData.length) return setError("Number of rows must be less then 10000");

            filterInformation(parsedData,fileName)
		};
		reader.readAsText(file);
	};

    const filterInformation = (columns, fileName) =>{
        let total_orders = 0;
        let productsSale = []
        let productsWithBrands = []
        columns.forEach(element => {
            if(element.length > 3){
                total_orders += 1;
                
                let sale = {
                    name: element[2],
                    qty: Number(element[3]),
                }
                
                let brandSale = {
                    name: element[2],
                    brand: element[4],
                    qty: 1
                }

                const brandIndex = productsWithBrands.findIndex(object => {
                    return  object.name === brandSale.name && object.brand === brandSale.brand;
                });

                if(brandIndex > -1){
                    productsWithBrands[brandIndex].qty += 1 
                } else {
                    productsWithBrands.push(brandSale);
                }

                const index = productsSale.findIndex(object => {
                    return  object.name === sale.name;
                });
                
                if(index > -1){
                    productsSale[index].qty += sale.qty 
                } else {
                    productsSale.push(sale);
                }
            }
        });
        
        let productsAvg = []
        productsSale.forEach(element => {
            let product = {
                name : element.name,
                avg : (element.qty / total_orders).toFixed(2)
            }
            productsAvg.push(product)
        });

        const filename = `0_${fileName}`;
        generateCSV(productsAvg,filename );
        let productWithPopularBrand = []

        productsWithBrands.forEach( element => {
            
            const index2 = productWithPopularBrand.findIndex(object => {
                return  object.name === element.name;
            });

            if(index2 > -1){
                if(element.qty > productWithPopularBrand[index2].qty)
                productWithPopularBrand[index2].qty += element.qty 
                productWithPopularBrand[index2].brand += element.brand 
            } else {
                productWithPopularBrand.push(element);
            }
        });
        
        const filename2 = `1_${fileName}`;
        generateCSV(productWithPopularBrand,filename2);
    }

    const convertArrayOfObjectsToCSV = (array) => {
        let result;
        const columnDelimiter = ',';
        const lineDelimiter = '\n';
        const keys = Object.keys(array[0]);
        result = '';
    
        array.forEach(item => {
            let ctr = 0;
            keys.forEach(key => {
                if (ctr > 0) result += columnDelimiter;
    
                result += item[key];
                ctr++;
            });
            result += lineDelimiter;
        });
        return result;
    }

    const generateCSV = (data, name) => {
        const link = document.createElement('a');
        let csv = convertArrayOfObjectsToCSV(data);
        const filename = name;
        if (!csv.match(/^data:text\/csv/i)) {
            csv = `data:text/csv;charset=utf-8,${csv}`;
        }
        link.setAttribute('href', encodeURI(csv));
        link.setAttribute('download', filename);
        link.click();
    }
    
	return (
		<div>
            <CssBaseline />
            <Container maxWidth="md">
                <div className="mainDiv">
                    <label htmlFor="csvInput" className="labelStyle">
                        Welcome to CSV Compiler CI/CD
                    </label>
                    <div className="inputDivStyle">
                        <Button
                            className="inputButtonStyle"
                            variant="contained"
                            component="label"
                            >
                            Upload File
                            <input
                                type="file"
                                hidden
                                onChange={handleFileChange}
                                id="csvInput"
                                name="file"
                            />
                        </Button>
                        <span style={{marginLeft:"10px"}}>{file.name}</span>
                    </div>
                </div>
                
                <div className="generateDivCss">
                    {error ? error : file.name && 
                    <Button variant="contained" color="primary" component="label" onClick={() => handleParse(file.name)} >
                        Generate Files
                    </Button>
                    }
                </div>
            </Container>
		</div>
	);
};


export default App;
