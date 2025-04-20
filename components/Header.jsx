import chef from '../assets/chef.png'

export default function Header(){
  return(
    <header>
      <img src={chef} alt="chef logo" />
      <h1>Chef Claude</h1>
    </header>
  )
}