import { FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, SelectChangeEvent } from "@mui/material"
import { useEffect, useState } from "react";
import ClotheService from "../../services/clothe.service";
import { ClothesCategory } from "../../interfaces/ClothesInterfaces";
import { ErrorInterface } from "../../interfaces/ErrorInterface";
import SearchInput from "../Search/SearchInput";
import CategoryService from "../../services/category.service";
import { CategoryInterface } from "../../interfaces/CategoryInterfaces";

interface props {
  id_category: string
  setData: (clothes: ClothesCategory) => void
}

const Filters: React.FC<props> = ({ id_category, setData }) => {

  const [gender, setGender] = useState<number>(3);
  const [text, setText] = useState<string>('');
  const [categories, setCategories] = useState<CategoryInterface | null>(null);
  const [category, setCategory] = useState<string>(id_category);

  // const [sortBy, setSortBy] = useState<keyof ClotheDataInterface>('id');
  // const [sortOrder, setSortOrder] = useState<string>('asc');
  // const [perPage, _setPerPage] = useState<number>(10);

  useEffect(() => {
    getCategories();
  }, []); // eslint-disable-line

  const getCategories = async () => {
    const response = await CategoryService.getCategories();
    if (response.code == 200) {
      setCategories(response);
    }
  }

  useEffect(() => {
    getClothes();
  }, [gender, text, category]); // eslint-disable-line

  const getClothes = async (page?: number, perPage?: number, sortBy?: string, sortOrder?: string) => {
    try {
      const response = await ClotheService.getClothes(Number(category), gender, page, perPage, sortBy, sortOrder, text);
      if (response.code == 200) {
        setData(response.data);    
      }
    } catch (error: unknown) {
      const apiError = error as ErrorInterface<ClothesCategory>;
      if (apiError.code === 404 && apiError.data) {
        setData(apiError.data)
      }
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGender(Number((event.target as HTMLInputElement).value));
  };

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  };

  return (
    <FormControl className="w-full lg:w-80">
      <div className="flex flex-col gap-2 mb-4 md:grid grid-cols-2 lg:flex">
        <FormControl 
          variant="standard" 
          sx={{ 
            m: 0,
            minWidth: 120, 
            width: '100%',
            '& .MuiInput-underline:before': {
              borderBottomColor: '#766274', // Borde antes de enfocar
              borderBottomWidth: '4px',
            },
            '& .MuiInput-underline:after': {
              borderBottomColor: '#C3ADC1', // Borde después de enfocar
              borderBottomWidth: '4px',
            },
            '&:hover .MuiInput-underline:before': {
              borderBottomColor: '#766274', // Borde al pasar el mouse
              borderBottomWidth: '4px',
            }
          }}
        >
          <InputLabel 
            id="demo-simple-select-standard-label"
          >
            Category
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={category}
            onChange={handleCategoryChange}
            label="Category"
            sx={{
              p: 0.75,
              backgroundColor: "#CBCBCB",
            }}
            >
            {
              categories?.data.map((category) => (
                <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
        <div>
          <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={gender}
            onChange={handleChange}
          >
            <FormControlLabel value={3} control={<Radio sx={{'&.Mui-checked':{color: '#766274'}}} />} label="All" />
            <FormControlLabel value={2} control={<Radio sx={{'&.Mui-checked':{color: '#766274'}}} />} label="Female" />
            <FormControlLabel value={1} control={<Radio sx={{'&.Mui-checked':{color: '#766274'}}} />} label="Male" />
          </RadioGroup>
        </div>
        <div className="row-start-1 col-start-2 m-auto mb-0 w-full">
          <SearchInput setText={setText} />
        </div>
      </div>
    </FormControl>
  )
}

export default Filters