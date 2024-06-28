# estimate-builder-pro

The estimate builder is a comprehensive web-based application designed to streamline the creation of estimates by selecting from a list of prebuilt CAN jobs. It allows for manual entry of customer data and provides the flexibility to adjust values after selecting a job. The system supports saving and printing estimates in a professional format.

Key Features
Job Selection and Configuration:

CAN Job Dropdown: A dropdown menu listing all available prebuilt CAN jobs (e.g., "CAN Job 1", "CAN Job 2", etc.).

Auto-Fill Functionality: Upon selecting a CAN job, the system automatically populates the following fields with pre-configured values:

Parts: Roof Kit, Roof Membrane, SLF LVL DICOR, NON LVL DICOR, ROOF SCREWS, GLUE, Additional Parts, Parts.

Labor: Repair Description, Notes, Hrs, Labor/Hr, Sublet, Extras, Labor, Shop Supplies, Tax, Total Estimate.

Adjustable Values: Users can manually adjust any of the auto-filled values to better suit the specific needs of the job.

Customer Information Capture:

Manual Entry: All customer information fields are manually entered by the user:

Estimate#, First Name, Last Name, Phone Number, Unit Description, VIN#, Advisor, Payment Type, Deductible, Date.

User Interface and Controls:

Intuitive Design: The interface is user-friendly, with clear labels and instructions to guide users through the estimate creation process.

Validation: Basic validation checks ensure that all necessary fields are filled out correctly before the estimate can be saved or printed.

Save and Print Capabilities:

Save Estimate: Users can save the estimate in the system for future reference or editing.

Print Estimate: The estimate can be printed directly from the application in a professional format suitable for client presentation or record-keeping.

Additional Fields for CAN Jobs
Roof Kit: Quantity and cost.

Roof Membrane: Quantity and cost.

SLF LVL DICOR: Quantity and cost.

NON LVL DICOR: Quantity and cost.

ROOF SCREWS: Quantity and cost.

GLUE: Quantity and cost.

Additional Parts: Description and cost.

Labor: Hours, rate, and total cost.

Shop Supplies: Description and cost.

Tax: Calculated based on parts and labor.

Total Estimate: Automatically calculated based on parts, labor, and tax.

Benefits
Efficiency: Leverages pre-configured job templates to reduce the time required to generate an estimate.

Flexibility: Allows for manual adjustments to parts and labor values, ensuring that the estimate accurately reflects the specific requirements of each job.

Usability: Provides a straightforward and intuitive user experience, making it easy for users to create, save, and print estimates.

Configuring the CAN job values in your estimate builder involves setting up the pre-defined values for parts, labor, and total costs associated with each CAN job. Here’s a step-by-step guide on how to configure these values:

Step 1: Access the Job Configuration Interface
Log in to the Estimate Builder: Access the estimate builder application using your credentials.

Navigate to Job Configuration: Look for a section labeled "Job Configuration" or "Manage CAN Jobs" in the admin or settings menu.

Step 2: Add or Edit CAN Jobs
Add New Job:

Click on "Add New Job" or a similar button.

Enter the name of the new CAN job (e.g., "CAN Job 1").

Edit Existing Job:

Select the job you wish to edit from the list of existing CAN jobs.

Step 3: Configure Parts Values
Enter Parts Details:

For each part (e.g., Roof Kit, Roof Membrane, SLF LVL DICOR, NON LVL DICOR, ROOF SCREWS, GLUE, Additional Parts), enter the quantity and cost.

Use the "Add Part" button if additional parts need to be included that are not listed by default.

Step 4: Configure Labor Values
Enter Labor Details:

Input the description of the labor required (e.g., "Repair Description").

Specify the number of hours required (Hrs) and the hourly rate (Labor/Hr).

Include any sublet costs or extras.

Enter the total labor cost, which can be calculated automatically based on the hours and rate if the system supports it.

Step 5: Configure Total Estimate
Calculate Total Estimate:

The system should automatically calculate the total estimate based on the parts and labor costs.

Adjust the total if necessary, especially if there are additional costs like shop supplies or tax that need to be included.

Step 6: Save the Configuration
Save Changes:

After configuring all the values, click on "Save" or "Update Job" to store the changes.

Confirm that the job details are correctly saved and displayed in the list of CAN jobs.

The app needs a header on estimate builder and estimates with Monochromatic colors blue's white's grey's and accents of neon green, orange, white FOR ALL COLORS IN THE APP. header background should be bright blue The Logo Text on left side of header " RV STATION ", on right side of header the contact info "
Mark Williamson
Service Advisor
RV Station
411 Sherard st
Colbert,OK 73446
580-579-5036
mark@rvstation.com "

## Collaborate with GPT Engineer

This is a [gptengineer.app](https://gptengineer.app)-synced repository 🌟🤖

Changes made via gptengineer.app will be committed to this repo.

If you clone this repo and push changes, you will have them reflected in the GPT Engineer UI.

## Tech stack

This project is built with React with shadcn-ui and Tailwind CSS.

- Vite
- React
- shadcn/ui
- Tailwind CSS

## Setup

```sh
git clone https://github.com/GPT-Engineer-App/estimate-builder-pro.git
cd estimate-builder-pro
npm i
```

```sh
npm run dev
```

This will run a dev server with auto reloading and an instant preview.

## Requirements

- Node.js & npm - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
