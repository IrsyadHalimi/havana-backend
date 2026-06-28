export const verificationEmailTemplate = (
  fullName: string,
  verificationUrl: string
) => {

  return `
<!DOCTYPE html>

<html>

<head>

<meta charset="UTF-8"/>

<style>

body{

font-family:Arial;

background:#f5f5f5;

padding:40px;

}

.container{

max-width:600px;

margin:auto;

background:white;

padding:40px;

border-radius:10px;

}

.button{

display:inline-block;

padding:12px 24px;

background:#2563eb;

color:white;

text-decoration:none;

border-radius:8px;

}

</style>

</head>

<body>

<div class="container">

<h2>Hello ${fullName}</h2>

<p>

Welcome to our platform.

</p>

<p>

Please verify your email.

</p>

<a
class="button"
href="${verificationUrl}"
>

Verify Email

</a>

</div>

</body>

</html>
`;

};