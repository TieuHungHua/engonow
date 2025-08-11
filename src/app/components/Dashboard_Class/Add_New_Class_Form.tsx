"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RiAddBoxLine, RiDeleteBinLine, RiUserAddLine } from "react-icons/ri";

interface ClassFormData {
  className: string;
  tuitionFee: string;
  classSize: number;
  schedule: string;
  instructors: string[];
}

export default function AddNewClassForm() {
  const [formData, setFormData] = React.useState<ClassFormData>({
    className: "",
    tuitionFee: "",
    classSize: 0,
    schedule: "",
    instructors: [""],
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: id === "classSize" ? Number(value) : value,
    }));
  };

  const handleInstructorChange = (index: number, value: string) => {
    const updated = [...formData.instructors];
    updated[index] = value;
    setFormData((prev) => ({ ...prev, instructors: updated }));
  };

  const addInstructor = () => {
    setFormData((prev) => ({
      ...prev,
      instructors: [...prev.instructors, ""],
    }));
  };

  const removeInstructor = (index: number) => {
    const updated = formData.instructors.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, instructors: updated }));
  };

  const resetForm = () => {
    setFormData({
      className: "",
      tuitionFee: "",
      classSize: 0,
      schedule: "",
      instructors: [""],
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.className ||
      !formData.tuitionFee ||
      !formData.schedule ||
      formData.instructors.some((i) => i.trim() === "")
    ) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    console.log("Class submitted:", formData);
    alert("🎉 Thêm lớp thành công!");
    resetForm();
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen p-6 flex items-center justify-center">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 flex items-center justify-center gap-2">
              <RiAddBoxLine className="text-blue-600" /> Add New Class
            </h1>
            <p className="text-gray-500 mt-2 text-sm">
              Tạo lớp học mới với thông tin chi tiết và giảng viên
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Class Name */}
            <div>
              <Label htmlFor="className" className="font-semibold">Class Name</Label>
              <Input
                id="className"
                value={formData.className}
                onChange={handleInputChange}
                placeholder="VD: IELTS 6.5-7.0"
                className="mt-1 focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Tuition Fee & Class Size */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="tuitionFee" className="font-semibold">Tuition Fee</Label>
                <Input
                  id="tuitionFee"
                  value={formData.tuitionFee}
                  onChange={handleInputChange}
                  placeholder="VD: 15,000,000"
                  className="mt-1 focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <Label htmlFor="classSize" className="font-semibold">Class Size</Label>
                <Input
                  id="classSize"
                  type="number"
                  min={0}
                  value={formData.classSize}
                  onChange={handleInputChange}
                  className="mt-1 focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            {/* Schedule */}
            <div>
              <Label htmlFor="schedule" className="font-semibold">Schedule</Label>
              <Input
                id="schedule"
                value={formData.schedule}
                onChange={handleInputChange}
                placeholder="VD: Mon-Wed-Fri, 7-9 PM"
                className="mt-1 focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Instructors */}
            <div>
              <Label className="font-semibold">Instructors</Label>
              <div className="space-y-3 mt-2">
                {formData.instructors.map((instructor, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <Input
                      value={instructor}
                      onChange={(e) =>
                        handleInstructorChange(index, e.target.value)
                      }
                      placeholder={`Instructor ${index + 1}`}
                      className="focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    {formData.instructors.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => removeInstructor(index)}
                        className="text-red-500 border-red-300 hover:bg-red-50"
                      >
                        <RiDeleteBinLine />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="secondary"
                  onClick={addInstructor}
                  className="w-full flex items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200"
                >
                  <RiUserAddLine /> Add Instructor
                </Button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={resetForm}
                className="border-gray-300 hover:bg-gray-100"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 shadow-md"
              >
                <RiAddBoxLine /> Add Class
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
