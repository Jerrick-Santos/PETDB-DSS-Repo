:: Install Node.js using NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
nvm install node

:: Install MySQL Server and MySQL Shell (using MySQL Installer)
:: Modify the path to the installer based on your downloaded version
start /wait "MySQL Installer" "C:\path\to\mysql-installer-community-version.msi"
