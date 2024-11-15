import { useForm } from "react-hook-form";
import { ProductType } from "../../types/product";
import TextField from "@mui/material/TextField/TextField";
import Typography from '@mui/material/Typography/Typography';
import Box from '@mui/material/Box/Box';
import { Item } from "../ui/Item";
import { TextareaAutosize } from '../ui/TextareaAutosize';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import { useContext } from "react";
import { ProductsContext } from "../../providers/ProductsContext";
import { FormHelperText } from "@mui/material";

type InputType = {
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

export const EditProduct = ({ product }: { product: ProductType | undefined }) => {
  const { updateProduct, createProduct } = useContext(ProductsContext);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<InputType>({
    defaultValues: {
      title: product?.title,
      description: product?.description,
      price: product?.price,
      category: product?.category,
      image: product?.image,
    }
  });

  const handleFormSubmit = (data: InputType) => {
    if (product) {
      updateProduct({ ...product, ...data });
    }
    else {
      const _newProduct: ProductType = {
        id: Math.floor(Math.random() * 1000),
        ...data,
        rating: { rate: 0, count: 0 }
      }
      createProduct(_newProduct);
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Item
          sx={{
            paddingY: 1,
            height: 1,
            width: 1,
            shadow: 2,
            justifyContent: "space-evenly",
            alignContent: "center",
            alignItems: "center",
          }}
          useFlexGap
          direction="column"
          spacing={2}
        >
          {product &&
            <Box
              sx={{ width: 1, height: "auto", marginX: "auto", paddingBottom: 10 }}
            >
              <img src={product.image} alt={product.title} width={250} height={250} style={{ aspectRatio: "square", objectFit: "contain" }} />
            </Box>
          }
          <Box sx={{ width: 0.5, marginX: "auto" }}>
            <TextField placeholder="Product Title" sx={{ width: 1 }} {...register("title", { required: "Do not leave title field empty !" })} />
            {errors.title && <Typography color="error">{errors.title.message}</Typography>}
          </Box>
          <Box sx={{ width: 0.5, marginX: "auto" }}>
            <TextField placeholder="Product Image URL" sx={{ width: 1 }} {...register("image", { required: "Do not leave image field empty !" })} />
            {errors.image && <Typography color="error">{errors.image.message}</Typography>}
            <FormHelperText>Provide just the url please.</FormHelperText>
          </Box>
          <Box sx={{ width: 0.5, marginX: "auto" }}>
            <TextareaAutosize placeholder="Product Description" {...register("description", { required: "Do not leave description field empty !" })} />
            {errors.description && <Typography color="error">{errors.description.message}</Typography>}
          </Box>

          <Box sx={{ width: 0.5, marginX: "auto" }}>
            <TextField placeholder="Product Category"{...register("category", { required: "Do not leave category field empty !" })} />
            {errors.category && <Typography color="error">{errors.category.message}</Typography>}
          </Box>
          <Box sx={{ width: 0.5, marginX: "auto" }}>
            <TextField placeholder="Product Price" type={"number"} {...register("price", { required: "Do not leave price field empty !" })} />
            {errors.price && <Typography color="error">{errors.price.message}</Typography>}
          </Box>
          <LoadingButton
            loading={isSubmitting}
            loadingPosition="start"
            startIcon={<SaveIcon />}
            type="submit"
            variant="outlined" sx={{ marginLeft: 3 }}>Save</LoadingButton>

        </Item>
      </form>
    </div>
  )
}
