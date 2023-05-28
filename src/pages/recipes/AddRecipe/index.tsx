import React, { useState, useEffect, useRef } from "react";
import { Form, Typography, Input, Row, Col, Upload, Space, InputNumber, Button } from 'antd'
import { PageHeader, Breadcrumb, Notifications } from "../../../components";
import { IconUploadLg } from '../../../assets/images'
import "./style.scss";
import useRecipesHook from '../actionHandler'



const AddRecipe = () => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const [form] = Form.useForm();
  const draftRef = useRef(null);
  const publishedRef = useRef(null);
  const [modalRecipeDeleteOpen, setModalRecipeDeleteOpen] = useState(false)
  const {createRecipe} = useRecipesHook();
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState('')



  /* EVENT LISTENERS
  -------------------------------------------------------------------------------------*/
  useEffect(() => {

  }, [])

  
  /* ASYNC FUNCTIONS
  -------------------------------------------------------------------------------------*/
  async function submitNewRecipe(values:any) {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('image', values.image[0].originFileObj);
    formData.append('description', values.description);
    formData.append('ingredients', values.ingredients);
    formData.append('instructions', values.instructions);
    formData.append('kitcherGear', values.kitcherGear);
    formData.append('servings', values.servings);
    formData.append('prepTimeHours', values.prepTimeHours);
    formData.append('prepTimeMins', values.prepTimeMins);
    formData.append('cookTimeHours', values.cookTimeHours);
    formData.append('cookTimeMins', values.cookTimeMins);
    formData.append('status', status);
    setLoading(true)
    const response = await createRecipe(formData);
    if(!response.error) {
      Notifications({title: "Success", description: response.message, type: 'success'});
    }
    form.resetFields();
    setLoading(false)
  }


  /* EVENT FUNCTIONS
  -------------------------------------------------------------------------------------*/
  function normFile(e: any) {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  }

  const submitAsPublished = () => {
    setStatus('published')
    form.submit()
  }

  const submitAsDraft = () => {
    setStatus('draft')
    form.submit()
  }



  /* RENDER APP
  -------------------------------------------------------------------------------------*/
  return (
    <>
      <div className="add-new-recipe">
        <PageHeader
          title={
            <Breadcrumb 
              breadCrumbData={[
                { name: "Add New Recipe" },
                { name: "Recipes", onClickNavigateTo: -1 },
              ]}  
            />
          }
          bordered
        />

        <div className="add-recipe-card">
          <div className="add-recipe-card-header">
            <Typography.Title level={4}>Recipe Details</Typography.Title>
            <Typography.Paragraph>Set of instructions that will describe about your recipe to other people.</Typography.Paragraph>
          </div>
        
          <Form 
            layout="vertical"
            name="addNewRecipe"
            requiredMark={false}
            form={form}
            onFinish={submitNewRecipe}
          >
            <div className="add-recipe-form-section">
              <div className="form-section-header">
                <div className="form-section-header-inner">
                  <Typography.Title level={4}>Description</Typography.Title>
                  <Typography.Paragraph>Give your recipe a name and briefly tell us about it.</Typography.Paragraph>
                </div>
              </div>
              <div className="form-section-fields">
                <div className="form-fields-container">
                  <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                    <Input className="filled" placeholder="Enter name of the recipe" />
                  </Form.Item>

                  <Form.Item label="Add Image" name="image" valuePropName="fileList" getValueFromEvent={normFile}>
                    <Upload.Dragger multiple={false} className="filled">
                      <div className="shs-drag-drop">
                        <div className="shs-upload-content">
                          <div className="shs-upload-text">Drag & drop files or <span>Browse</span></div>
                          <div className="shs-upload-hint">Support jpeg,pdf and doc files</div>
                        </div>
                        <div className="shs-upload-icon">
                          <IconUploadLg />
                        </div>
                      </div>
                    </Upload.Dragger>
                  </Form.Item>

                  <Form.Item name="description" label="Description" rules={[{ required: true }]}>
                    <Input.TextArea 
                      className="filled" 
                      placeholder="Write the description of internship" 
                      autoSize={{minRows: 5, maxRows: 5}}
                    />
                  </Form.Item>
                </div>
              </div>
            </div>

            <div className="add-recipe-form-section">
              <div className="form-section-header">
                <div className="form-section-header-inner">
                  <Typography.Title level={4}>How To Prepare</Typography.Title>
                  <Typography.Paragraph>Set of instructions needed to make the dish, including the quantity and measurement of each.</Typography.Paragraph>
                </div>
              </div>
              <div className="form-section-fields">
                <div className="form-fields-container">
                  <Form.Item name="kitcherGear" label="Kitcher Gear">
                    <Input className="filled" placeholder="Add one or paste multiple items" />
                  </Form.Item>

                  <Form.Item name="ingredients" label="Ingredients">
                    <Input className="filled" placeholder="Add one or paste multiple items" />
                  </Form.Item>

                  <Form.Item name="instructions" label="Instructions">
                    <Input className="filled" placeholder="Enter one or paste multiple steps" />
                  </Form.Item>

                  <Form.Item name="servings" label="Servings">
                    <Input className="filled" placeholder="Add portions" />
                  </Form.Item>
                </div>
              </div>
            </div>

            <div className="add-recipe-form-section">
              <div className="form-section-header">
                <div className="form-section-header-inner">
                  <Typography.Title level={4}>Preparation Time</Typography.Title>
                  <Typography.Paragraph>The amount of time it takes to prepare the ingredients, usually measured in minutes..</Typography.Paragraph>
                </div>
              </div>
              <div className="form-section-fields">
                <div className="form-fields-container">
                  <Row gutter={20}>
                    <Col xs={24} md={12}>
                      <Form.Item name="prepTimeHours" label="Hours" rules={[{ required: true }]}>
                        <InputNumber className="filled" placeholder="Hours 0" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                      <Form.Item name="prepTimeMins" label="Minutes" rules={[{ required: true }]}>
                        <InputNumber className="filled" placeholder="Minutes 0" />
                      </Form.Item>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>

            <div className="add-recipe-form-section">
              <div className="form-section-header">
                <div className="form-section-header-inner">
                  <Typography.Title level={4}>Cook time</Typography.Title>
                  <Typography.Paragraph>The amount of time it takes to cook the dish, usually measured in minutes.</Typography.Paragraph>
                </div>
              </div>
              <div className="form-section-fields">
                <div className="form-fields-container">
                  <Row gutter={20}>
                    <Col xs={24} md={12}>
                      <Form.Item name="cookTimeHours" label="Hours" rules={[{ required: true }]}>
                        <InputNumber className="filled" placeholder="Hours 0" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                      <Form.Item name="cookTimeMins" label="Minutes" rules={[{ required: true }]}>
                        <InputNumber className="filled" placeholder="Minutes 0" />
                      </Form.Item>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </Form>
          <div className="add-recipe-form-footer">
            {/* <Space size={20}> */}
              <Button 
                ref={draftRef} 
                className="button-tertiary"
                type="link"
                loading={loading}
                onClick={() => submitAsDraft()}
              >
                Save Draft
              </Button>
              <Button className="button-tertiary" ghost>Cancel</Button>
              <Button ref={publishedRef} className="button-tertiary" loading={loading}
                onClick={() => submitAsPublished()}
              >
                  Publish
                </Button>
              {/* </Space> */}
            </div>
        </div>
        
      </div>
    </>
  )
}

export default AddRecipe