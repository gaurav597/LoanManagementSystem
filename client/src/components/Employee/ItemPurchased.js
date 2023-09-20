import React from 'react'
import EmployeeDashboard from './EmployeeDashboard'

const ItemPurchased = () => {
    return (
        <div>
            <EmployeeDashboard />

            <div class ="container tnew">
      <h1>Purchased Items</h1>
      <table>
        <thead>
          <tr>
            <th>Issue ID</th>
            <th>Item Description</th>
            <th>Item Make</th>
            <th>Item Category</th>
            <th>Item Valuation</th>
          </tr>
        </thead>
        <tbody>
         <tr><td>Sample</td>
         <td>Sample</td>
         <td>Sample</td>
         <td>Sample</td>
         <td>Sample</td></tr>
        
        </tbody>
      </table>

      <table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">Issue ID</th>
      <th scope="col">Item Description</th>
      <th scope="col">Item Make</th>
      <th scope="col">Item Category</th>
      <th scope="col">Item Valuation</th>

    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Sample</td>
         <td>Sample</td>
         <td>Sample</td>
         <td>Sample</td>
    </tr>
    
  </tbody>
</table>

      </div>
    </div>
    )
}

export default ItemPurchased