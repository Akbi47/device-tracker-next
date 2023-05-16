import { SearchTwoTone } from "@mui/icons-material";
import { Autocomplete, Box, FormControl, Grid, IconButton, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useFormik } from "formik";
import { SyntheticEvent, useCallback, useMemo } from "react";

import { SearchConditionForm, searchConditionFormSchema } from "../../../forms";
import { useDropdownProjects, useDropdownSkills, useDropdownUsers } from "../../../hooks";

const initialFormValues: SearchConditionForm = {
  year: new Date().getFullYear(),
  date: new Date(),
  projectId: null,
  userId: null,
  skillIds: null,
};

type SearchConditionProps = {
  searchSkill?: boolean;
  onSearch?: (_values: SearchConditionForm) => void;
};

const SearchCondition = ({ searchSkill, onSearch }: SearchConditionProps) => {
  const { projects = [] } = useDropdownProjects();
  const { users = [] } = useDropdownUsers();
  const { skills = [] } = useDropdownSkills();

  const projectOptions = useMemo(() => projects.map((item) => item.id), [projects]);
  const userOptions = useMemo(() => users.map((item) => item.id), [users]);
  const skillOptions = useMemo(() => skills.map((item) => item.id), [skills]);

  const handleSubmitFormik = useCallback(
    (values: SearchConditionForm) => {
      const { date: _, ...others } = values;
      onSearch && onSearch(others);
    },
    [onSearch]
  );

  const { values, errors, touched, handleSubmit, setFieldValue } = useFormik({
    initialValues: initialFormValues,
    validationSchema: searchConditionFormSchema,
    onSubmit: handleSubmitFormik,
  });

  const handleComboboxChange = useCallback(
    (fieldName: string) => (_event: SyntheticEvent<Element, Event>, value: string | null) => {
      setFieldValue(fieldName, value);
    },
    [setFieldValue]
  );

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={4}>
        {/* Year */}
        <Grid item xs={12} md={2} lg={2}>
          <FormControl fullWidth>
            <DatePicker
              views={["year"]}
              openTo="year"
              label="Năm"
              value={values.date}
              onChange={(date: any) => {
                if (date) {
                  const selectedDate = date.toDate ? date.toDate() : date;
                  setFieldValue("year", selectedDate.getFullYear());
                  setFieldValue("date", selectedDate);
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="small"
                  error={touched.date && Boolean(errors.date)}
                  helperText={touched.date && errors.date && String(errors.date)}
                />
              )}
            />
          </FormControl>
        </Grid>

        {/* Project */}
        <Grid item xs={12} md={3} lg={2}>
          <FormControl fullWidth>
            <Autocomplete
              options={projectOptions}
              value={values.projectId}
              getOptionLabel={(option) => {
                const project = projects.find((item) => item.id === option);
                return project ? `${project.customer?.name} / ${project.name}` : "";
              }}
              renderOption={(props, option) => {
                console.log("renderOption: ", option);
                const project = projects.find((item) => item.id === option);
                return (
                  <Box component="li" {...props}>
                    {project?.customer?.name && (
                      <Typography color="text.secondary">{project?.customer?.name}&nbsp;/&nbsp;</Typography>
                    )}
                    {project?.name && <Typography>{project?.name}</Typography>}
                  </Box>
                );
              }}
              onChange={handleComboboxChange("projectId")}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Dự án"
                  size="small"
                  error={touched.projectId && Boolean(errors.projectId)}
                  helperText={touched.projectId && errors.projectId}
                />
              )}
            />
          </FormControl>
        </Grid>

        {/* User */}
        <Grid item xs={12} md={3} lg={2}>
          <FormControl fullWidth>
            <Autocomplete
              options={userOptions}
              value={values.userId}
              getOptionLabel={(option) => {
                const user = users.find((item) => item.id === option);
                return user?.fullName || "";
              }}
              onChange={handleComboboxChange("userId")}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Nhân sự"
                  size="small"
                  error={touched.userId && Boolean(errors.userId)}
                  helperText={touched.userId && errors.userId}
                />
              )}
            />
          </FormControl>
        </Grid>

        {/* Skill */}
        {searchSkill && (
          <Grid item xs={12} md={3} lg={2}>
            <FormControl fullWidth>
              <Autocomplete
                options={skillOptions}
                value={values.skillIds}
                getOptionLabel={(option) => {
                  const skill = skills.find((item) => item.id === option);
                  return skill?.name || "";
                }}
                onChange={handleComboboxChange("skillIds")}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Trình độ kỹ thuật"
                    size="small"
                    error={touched.skillIds && Boolean(errors.skillIds)}
                    helperText={touched.skillIds && errors.skillIds}
                  />
                )}
              />
            </FormControl>
          </Grid>
        )}

        {/* Submit Button */}
        <Grid item>
          <IconButton
            type="submit"
            color="primary"
            sx={{
              width: "40px",
              height: "40px",
              border: "1px solid",
            }}
          >
            <SearchTwoTone />
          </IconButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default SearchCondition;
