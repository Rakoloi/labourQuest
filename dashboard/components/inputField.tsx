import { TextField, InputAdornment } from "@mui/material";
import { LucideIcon } from "lucide-react";


interface MUIInputProps {
    label: string;
    placeholder?: string;
    type?: string;
    icon: React.ElementType;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}


export default function InputField({ label, placeholder, type = "text", icon: Icon, value, onChange }: MUIInputProps) {
    return (
        <TextField
            fullWidth
            type={type}
            placeholder={placeholder}
            label={label}
            value={value}
            onChange={onChange}
            InputLabelProps={{ style: { color: "#cbd5f5" } }}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                    <Icon size={18} color="#94a3b8" />
                    </InputAdornment>
                ),
            }}
            sx={{
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 2.5,
    '& fieldset': {
      borderColor: 'rgba(255,255,255,0.15)',
    },
    '&:hover fieldset': {
      borderColor: '#00D26A',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#00D26A',
    },
  },
  '& .MuiInputBase-input': {
    color: '#fff',           // <-- fix: text color applied here
    '&::placeholder': {
      color: '#64748b',
    },
  },
  '& label.Mui-focused': {
    color: '#00D26A',
  },
}}
        />
    );
}