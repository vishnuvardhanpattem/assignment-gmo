
import { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, Collapse, Checkbox } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

interface Department {
  department: string;
  sub_departments: string[];
}

// Hardcoded JSON data
const initialDepartments: Department[] = [
  {
    department: 'customer_service',
    sub_departments: ['support', 'customer_success'],
  },
  {
    department: 'design',
    sub_departments: ['graphic_design', 'product_design', 'web_design'],
  },
];

const DepartmentList = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [open, setOpen] = useState<string | null>(null);
  const [selected, setSelected] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    setDepartments(initialDepartments);
  }, []);

  const handleClick = (department: string) => {
    setOpen(open === department ? null : department);
  };

  const handleSelect = (department: string, subDepartment?: string) => {
    const key = subDepartment ? `${department}-${subDepartment}` : department;
    setSelected((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <List>
      {departments.map((dept) => (
        <div key={dept.department}>
          <ListItem button onClick={() => handleClick(dept.department)}>
            <Checkbox
              checked={
                dept.sub_departments.every((sub) =>
                  selected[`${dept.department}-${sub}`]
                ) || selected[dept.department]
              }
              onClick={() => handleSelect(dept.department)}
            />
            <ListItemText primary={dept.department} />
            {open === dept.department ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open === dept.department} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {dept.sub_departments.map((sub) => (
                <ListItem
                  key={sub}
                  button
                  style={{ paddingLeft: 32 }}
                  onClick={() => handleSelect(dept.department, sub)}
                >
                  <Checkbox
                    checked={
                      selected[`${dept.department}-${sub}`] || selected[dept.department]
                    }
                    onClick={() => handleSelect(dept.department, sub)}
                  />
                  <ListItemText primary={sub} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        </div>
      ))}
    </List>
  );
};

export default DepartmentList;
