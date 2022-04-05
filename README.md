# Waitlist Integration

Live Demo: https://dev.jaybayudan.com/wwv2/102/

Since businesses began to reopen in Hawaii last year, local mandates required restaurants and other high-risk establishments to collect contact tracing information from their customers. To decrease large groups of people from gathering and to minimize the use of paper products, I had the idea to have customers provide their contact tracing information by scanning a QR code and filling out an online form. The online form would be integrated with a waitlist API (WaitWhile) and place the customer on a waitlist upon completion.

Below is a brief overview of the experience. For demonstration purposes, a fictional restaurant restaurant called “Flat Table” has been created.

![Scan QR Code](https://blog.jaybayudan.com/wp-content/uploads/2021/10/IMG_6073-edited.png =x300)

1. Customer scans QR code posted at restaurant and opens the link.

![View Status](https://blog.jaybayudan.com/wp-content/uploads/2021/10/IMG_6090-edited.png =x300)

2. The location's information is displayed and prompts the customer to join the waitlist.

![Submit Contact Tracing](https://blog.jaybayudan.com/wp-content/uploads/2021/10/IMG_6092-947x2048.png =x300)

3. After the customer clicks “Join Waitlist”, they are reminded of local mandates to collect contact tracing information. A form to provide that information is displayed. Some counties do not require contact tracing, so this step can be hidden for specific locations.

![Enter waitlist details](https://blog.jaybayudan.com/wp-content/uploads/2021/10/IMG_6093-1-947x2048.png =x300)

4. Upon completion of the contact tracing form, the customer is taken to a check-in details page where they confirm their phone number, table preference, party size, and special needs such as wheelchair access or high chairs for toddlers.

![Confirmation](https://blog.jaybayudan.com/wp-content/uploads/2021/10/IMG_6094-947x2048.png =x300)

5. After confirming check-in details, the customer is taken to a success page where it shows their current place in line as well as a button to view their virtual ticket. They also receive a text message for confirmation.

![Cookies](https://blog.jaybayudan.com/wp-content/uploads/2021/10/IMG_6095-1-edited.png =x300)

6. Cookies are used to store a customers “PreCheck ID”. A PreCheck ID is a unique set of 6 characters that is associated with a customer and allows them to checkin without re-entering all of their contact tracing information whenever they decide to dine-in. Cookies are also used to check and prevent customers from checking in again if they are already on the wait list.

![Waitlist](https://blog.jaybayudan.com/wp-content/uploads/2021/10/Screen-Shot-2021-10-10-at-9.42.14-PM-edited.png =x300)

7. Customer is added to a waitlist using the WaitWhile API

![Admin](https://blog.jaybayudan.com/wp-content/uploads/2021/10/Screen-Shot-2021-10-10-at-9.43.18-PM-edited.png =x300)

8. A simple admin panel is available to view and sort through contacts and check-ins.

![Settings](https://blog.jaybayudan.com/wp-content/uploads/2021/10/Screen-Shot-2021-10-10-at-9.44.33-PM-edited.png =x300)

9. The admin may also enable/disable contact tracing options enable/disable the entire location.
