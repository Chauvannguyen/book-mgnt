import { useEffect, useState } from "react";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const UserForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [initialValues, setInitialValues] = useState({
        name: "",
        email: "",
        age: "",
        address: "",
        avatar: "",
    });

    const validationSchema = Yup.object({
        name: Yup.string().required("Bắt buộc nhập tên"),
        email: Yup.string().email("Email không hợp lệ").required("Bắt buộc nhập email"),
        age: Yup.number().min(1, "Tuổi phải > 0").required("Bắt buộc nhập tuổi"),
        address: Yup.string().required("Bắt buộc nhập địa chỉ"),
        avatar: Yup.string().url("Đường dẫn ảnh không hợp lệ").required("Bắt buộc nhập ảnh"),
    });

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:3000/users/${id}`)
                .then(res => setInitialValues(res.data))
                .catch(err => {
                    console.error(err);
                    alert("Không tìm thấy người dùng!");
                });
        }
    }, [id]);

    const handleSubmit = async (values) => {
        try {
            if (id) {
                await axios.put(`http://localhost:3000/users/${id}`, values);
                alert("Cập nhật người dùng thành công!");
            } else {
                await axios.post(`http://localhost:3000/users`, values);
                alert("Thêm người dùng thành công!");
            }
            navigate("/");
        } catch (error) {
            console.error(error);
            alert("Lỗi khi gửi dữ liệu.");
        }
    };

    return (
        <div className="container py-4">
            <h2>{id ? "Cập nhật người dùng" : "Thêm người dùng"}</h2>
            <NavLink to={"/"}>← Quay về danh sách</NavLink>

            <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                <Form style={{ maxWidth: "500px" }}>
                    <div className="mb-3">
                        <label className="form-label">Họ tên</label>
                        <Field name="name" className="form-control" />
                        <div className="text-danger"><ErrorMessage name="name" /></div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <Field name="email" type="email" className="form-control" />
                        <div className="text-danger"><ErrorMessage name="email" /></div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Tuổi</label>
                        <Field name="age" type="number" className="form-control" />
                        <div className="text-danger"><ErrorMessage name="age" /></div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Địa chỉ</label>
                        <Field name="address" className="form-control" />
                        <div className="text-danger"><ErrorMessage name="address" /></div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Ảnh đại diện (link)</label>
                        <Field name="avatar" className="form-control" />
                        <div className="text-danger"><ErrorMessage name="avatar" /></div>
                    </div>

                    <button type="submit" className="btn btn-success">
                        {id ? "Cập nhật" : "Thêm"}
                    </button>
                </Form>
            </Formik>
        </div>
    );
};

export default UserForm;
