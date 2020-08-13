<template>
  <div>
    <titulo :texto="`Aluno: ${aluno.nome}`" :btnVoltar="this.editando">
      <button class="btn btnEditar" @click="editar" v-show="!this.editando">Editar</button>
      <!-- <button class="btn btnEditar" @click="Cancelar" v-show="this.editando">Cancelar</button> -->
    </titulo>

    <table>
      <tbody>
        <tr>
          <td class="colPequeno">Matrícula:</td>
          <td>
            <label>{{aluno.id}}</label>
          </td>
        </tr>
        <tr>
          <td class="colPequeno">Nome:</td>
          <td>
            <label v-show="!this.editando">{{aluno.nome}}</label>
            <input v-model="aluno.nome" type="text" v-show="this.editando" />
          </td>
        </tr>
        <tr>
          <td class="colPequeno">Sobrenome:</td>
          <td>
            <label v-show="!this.editando">{{aluno.sobrenome}}</label>
            <input v-model="aluno.sobrenome" type="text" v-show="this.editando" />
          </td>
        </tr>
        <tr>
          <td class="colPequeno">Data Nascimento:</td>
          <td>
            <label v-show="!this.editando">{{aluno.dataNasc}}</label>
            <input v-model="aluno.dataNasc" type="text" v-show="this.editando" />
          </td>
        </tr>
        <tr>
          <td class="colPequeno">Professor:</td>
          <td>
            <label v-show="!this.editando">{{aluno.professor.nome}}</label>
            <select v-model="aluno.professor" v-show="this.editando">
              <option
                v-for="(professor, index) in professores"
                :key="index"
                v-bind:value="professor"
              >{{ professor.nome }}</option>
            </select>
          </td>
        </tr>
      </tbody>
    </table>

    <div style="margin-top: 10px">
      <div v-if="this.editando">
        <button class="btn btnSalvar" @click="salvar()">Salvar</button>
        <button class="btn btnCancelar" @click="cancelar()">Cancelar</button>


      </div>
    </div>

  </div>
</template>

<script>
import Titulo from "../_shared/Titulo";

export default {
  components: {
    Titulo,
  },

  data() {
    return {
      professores: [],
      aluno: {},
      idAluno: this.$route.params.id,
      editando: false,
    };
  },

  created() {
    this.$http
      .get("http://localhost:3000/alunos/" + this.idAluno)
      .then((res) => res.json())
      .then((aluno) => (this.aluno = aluno));

    this.$http
      .get("http://localhost:3000/professores")
      .then((res) => res.json())
      .then((professor) => (this.professores = professor));
  },

  methods: {
    editar() {
      this.editando = true;
    },
    salvar() {
        let _alunoEditar = {
          id: this.aluno.id,
          nome: this.aluno.nome,
          sobrenome: this.aluno.sobrenome,
          dataNasc: this.aluno.dataNasc,
          professor: this.aluno.professor,
        };

        this.$http.put(`http://localhost:3000/alunos/${_alunoEditar.id}`, _alunoEditar);

        this.editando = false;
    },
    cancelar() {
      this.editando = false;
    },
  },
};
</script>

<style scoped>
.btnEditar {
  float: right;
  background-color: rgb(76, 186, 249);
}

.btnSalvar {
  float: right;
  background-color: rgb(79, 196, 68);
}

.btnCancelar {
  float: right;
  background-color: rgb(249, 186, 92);
  float: left;
}

.colPequeno {
  width: 20%;
}

input,
select {
  margin: 0;
  padding: 5px 10px;
  font-size: 0.9em;
  font-family: Montserrat;
  border-radius: 5px;
  border: 1px solid silver;
  background-color: rgb(245, 245, 245);
  width: 95%;
}

select {
  height: 38px;
  width: 100%;
}
</style>