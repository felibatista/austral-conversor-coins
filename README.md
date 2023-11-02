# Conversor-Coins

## 📕 Introducción al problema
Se deberá desarrollar un conversor de monedas en un entorno web. El conversor permitiráa los usuarios registrados realizar conversiones entre diferentes monedas, pero con lalimitación de que solo aquellos usuarios que tengan una suscripción activa podrán utilizarlo.
Las suscripciones están diseñadas para restringir la cantidad de conversiones que un usuario puede realizar.

## 📃 Requisitos
Registro de Usuarios: Los usuarios podrán registrarse en la plataforma para obtener
acceso al conversor.
- Inicio de sesión: Los usuarios registrados deberán poder iniciar sesión en sus
cuentas.
- Monedas: el sistema permitirá consultar crear modificar y eliminar en base de datos
monedas con su codigo, leyenda e índice de convertibilidad La moneda va a tener código, leyenda, símbolo y un índice de convertibilidad (IC) que va permitir convertir de una moneda a otra. Este índice será guardado en la ase de datos de manera estática para fines didácticos pero la idea sería que se pueda actualizar según varia las monedas. El índice de convertibilidad será la
relación que existe entre una moneda y el dólar americano expresada en cuanto vale una unidad de dicha moneda en comparación a 1 usd.
Ejemplos de índices de convertibilidad para diferentes monedas:
  - IC para ARS (Peso argentino): 0.002
  - IC para EUR (Euro): 1.09
  - IC para KC (Corona Checa): 0.043
  - IC para USD (Dolar americano): 1
- Suscripciones: Deberá implementar un sistema de suscripciones que controle el
acceso al conversor. Los usuarios sin suscripción no podrán utilizarlo.
  - Suscripción Free: Los usuarios podrán activar una suscripción gratuita que les dará como máximo unas 10 conversiones. Suscripción Trial: 100 conversiones.
  - Suscripción Pro: sin límite de conversiones
- Conversión de Monedas: Los usuarios podrán seleccionar dos monedas diferentes y
especificar la cantidad a convertir. El sistema deberá proporcionar la cantidad
convertida.
- Historial de Conversiones: Deberás mantener un registro de las conversiones
realizadas por cada usuario, incluyendo la fecha en que se realizó. El límite de
conversiones pasará a ser en vez de 10 y 100 conversiones para la suscripciones
Free y Trial a 10 y 100 por mes. Es decir que si un usuario Free hizo 10
conversiones en los últimos 30 días la conversión nro 11 le será denegada
- Monedas favoritas: cuando un usuario con suscripción free o pro puede hacer a las
monedas que desee como favoritas de manera tal que cuando dicho usuario acceda
al sistema sus monedas favoritas se despliegan con mayor relevancia que las
demás
- Un panel administrativo en donde solo un usuario admin puede crear y actualizar
monedas con su respectivo IC código y leyenda.
- Un panel administrativo en donde solo un usuario admin pueda crear actualizar y dar
de baja usuarios, modificar usuarios incluirá la posibilidad de cambiar la suscripción
del mismo
