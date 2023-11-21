let registros = [];
let ordenacaoAtual = null;
let ordemAscendente = true;


function salvarRegistro(endereco) {

    /* Validador de endereço não definido */
    if (endereco.cep === undefined) {
        console.warn('CEP não definido. O registro não será salvo.');
        return;
    }

    const cepExistente = registros.some(registro => registro.cep === endereco.cep);
    
    /* Valida a coexistência do CEP */
    if (cepExistente) {
        console.log('CEP já existe nos registros. O registro não será salvo novamente.');
        return;
    }

    /* Acessa a logica do Save em arquivo JSON */
    fetch('logic/save.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(endereco),
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            console.log('Registro salvo com sucesso!');
            carregarRegistros();
        } else {
            console.error('Erro ao salvar o registro:', data.message);
        }
    })
    .catch(error => {
        console.error('Erro na requisição:', error);
    });
}

function consultarCEP() {
    const cepInput = document.getElementById('cepInput');
    const resultadoDiv = document.getElementById('resultado');

    const cep = cepInput.value.replace(/\D/g, ''); // Remove caracteres não numéricos

    /* Comprimento padrão do CEP */
    if (cep.length === 8) {
        /* Inicia a requisição com fetch*/
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(data => {
                resultadoDiv.innerHTML = `
                    <p><strong>CEP:</strong> ${data.cep}</p>
                    <p><strong>Logradouro:</strong> ${data.logradouro}</p>
                    <p><strong>Bairro:</strong> ${data.bairro}</p>
                    <p><strong>Cidade:</strong> ${data.localidade}</p>
                    <p><strong>Estado:</strong> ${data.uf}</p>
                `;

                salvarRegistro(data);
            })
            .catch(error => {
                console.error('Erro na consulta:', error);
                resultadoDiv.innerHTML = '<p>Erro na consulta, por favor, tente novamente.</p>';
            });
    } else {
        resultadoDiv.innerHTML = '<p>CEP inválido. Por favor, insira um CEP válido.</p>';
    }
}

/* Função para carregar o arquivo JSON */
function carregarRegistros() {
    fetch('logic/carregar.php')
    .then(response => response.json())
    .then(data => {
        if (data !== null) {
            registros = data;
            exibirRegistros();
        } else {
            console.error('Os dados carregados estão vazios ou nulos.');
        }
    })
    .catch(error => {
        console.error('Erro ao carregar registros:', error);
    });
}

/* Exibição dos registros salvos em tabela */
function exibirRegistros() {
    const tabela = document.querySelector('.tableBuscas table');
    tabela.innerHTML = '<tr><th><button onclick="ordenarRegistros(\'localidade\')">Cidade</button></th><th><button onclick="ordenarRegistros(\'bairro\')">Bairro</button></th><th><button onclick="ordenarRegistros(\'uf\')">Estado</button></th><th><button onclick="ordenarRegistros(\'cep\')">CEP</button></th><th><button onclick="ordenarRegistros(\'logradouro\')">Logradouro</button></th></tr>';

    registros.forEach(registro => {
        tabela.innerHTML += `
            <tr>
                <td>${registro.localidade}</td>
                <td>${registro.bairro}</td>
                <td>${registro.uf}</td>
                <td>${registro.cep}</td>
                <td>${registro.logradouro}</td>
            </tr>
        `;
    });
}

/* Ordenador em ordem crescente e decrescente dos dados preenchidos */
function ordenarRegistros(criterio) {
    if (criterio === ordenacaoAtual) {
        ordemAscendente = !ordemAscendente;
    } else {
        ordenacaoAtual = criterio;
        ordemAscendente = true;
    }

    registros.sort((a, b) => {
        const valorA = a[criterio].toUpperCase();
        const valorB = b[criterio].toUpperCase();

        if (ordemAscendente) {
            return valorA.localeCompare(valorB);
        } else {
            return valorB.localeCompare(valorA);
        }
    });

    exibirRegistros();
}

carregarRegistros();

