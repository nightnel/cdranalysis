select 
    date(DATA) as DATA,
    CZAS,
    NRFIZYCZNYA,
    NRFIZYCZNYB,
    NRKATALOGOWYA,
    NRWIRTUALNYA,
    INFWYBIERCZA,
    CZASTRWANIA,
    CZASZESTAWIANIA,
    IMPULSY,
    concat("m", MODUL) as MODUL,
    TYP,
    PODTYP 
from trf2_12_2014
order by
    date(DATA) desc,
    CZAS desc
limit 200