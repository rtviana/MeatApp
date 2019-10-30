//tipo que representa o restaurante, e suas propriedades
//uma representacao do dado
export interface Restaurant{

  id: string
  name: string
  category: string
  deliveryEstimate: string
  rating: number
  imagePath: string
  hours?: string
  about: string
}
