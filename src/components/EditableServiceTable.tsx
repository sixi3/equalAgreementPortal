"use client";

import { ValueAddedService } from "@/types";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Trash2, PlusCircle } from "lucide-react";

interface EditableServiceTableProps {
    title: string;
    data: ValueAddedService[];
    onChange: (newData: ValueAddedService[]) => void;
}

export function EditableServiceTable({ title, data, onChange }: EditableServiceTableProps) {
    
    const handleItemChange = (index: number, field: keyof ValueAddedService, value: string) => {
        const newData = [...data];
        newData[index] = { ...newData[index], [field]: value };
        onChange(newData);
    };

    const handleAddItem = () => {
        onChange([...data, { name: 'New Service', description: 'New Description' }]);
    };

    const handleRemoveItem = (index: number) => {
        const newData = data.filter((_, i) => i !== index);
        onChange(newData);
    };

    return (
        <div>
            <h3 className="text-lg font-medium">{title}</h3>
            <div className="mt-2 rounded-lg border">
                {/* Header */}
                <div className="grid grid-cols-[1fr_2fr_40px] gap-x-4 items-center bg-slate-50 p-2 border-b font-medium text-sm">
                    <div>Service</div>
                    <div>Description</div>
                </div>
                {/* Rows */}
                {data.map((item, index) => (
                    <div className="grid grid-cols-[1fr_2fr_40px] gap-x-4 items-center p-2 border-b last:border-b-0" key={index}>
                        <Input value={item.name} onChange={(e) => handleItemChange(index, 'name', e.target.value)} />
                        <Input value={item.description} onChange={(e) => handleItemChange(index, 'description', e.target.value)} />
                        <Button variant="ghost" size="icon" onClick={() => handleRemoveItem(index)}>
                            <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                    </div>
                ))}
            </div>
            <div className="mt-2">
                <Button variant="outline" onClick={handleAddItem}>
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Row
                </Button>
            </div>
        </div>
    );
} 